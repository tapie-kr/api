import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ApplyForm, Asset, FormResponse } from '@tapie-kr/api-database';
import { MemberGuestPayload } from '@/auth/dto/member-payload.dto';
import { PrismaUniqueConstraintError, toTypedPrismaError } from '@/common/prisma/prisma.exception';
import { PrismaService } from '@/common/prisma/prisma.service';
import { KSTDate } from '@/common/utils/date';
import { CreateFormDto, UpdateFormDto } from '@/form/dto/form.dto';
import { CreateFormResponseDto, UpdateFormResponseDto } from '@/form/dto/response.dto';

type FormResponseWithPortfolio = FormResponse & {
  portfolio: Asset | null;
};

@Injectable()
export class FormRepository {
  constructor(private readonly prisma: PrismaService) {
  }
  separateName(input: string): {
    studentId: string; name: string;
  } {
    return {
      studentId: input.slice(0, 5), name: input.slice(5),
    };
  }
  async create(data: CreateFormDto): Promise<ApplyForm> {
    try {
      return await this.prisma.applyForm.create({ data });
    } catch (error) {
      throw new InternalServerErrorException('폼을 생성하는데 문제가 발생했습니다.', error?.message);
    }
  }
  async update(id: number, data: UpdateFormDto): Promise<ApplyForm> {
    try {
      return await this.prisma.applyForm.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new InternalServerErrorException('폼 데이터를 업데이트하는데 문제가 발생했습니다.', error?.message);
    }
  }
  async remove(id: number): Promise<ApplyForm> {
    return this.prisma.applyForm.delete({ where: { id } });
  }
  async findOne(id: number): Promise<ApplyForm | null> {
    return this.prisma.applyForm.findUnique({ where: { id } });
  }
  async findAll(): Promise<ApplyForm[]> {
    return this.prisma.applyForm.findMany();
  }
  async findAllResponses(id: number): Promise<FormResponse[]> {
    return this.prisma.formResponse.findMany({
      where: { formId: id }, orderBy: { createdAt: 'desc' },
    });
  }
  async findOneResponse(responseId: string): Promise<FormResponse> {
    return this.prisma.formResponse.findUnique({
      where: { uuid: responseId }, include: { portfolio: true },
    });
  }
  async getActiveForm(): Promise<ApplyForm> {
    return this.prisma.applyForm.findFirst({ where: { active: true } });
  }
  async activateForm(id: number): Promise<ApplyForm> {
    const activeForm = await this.prisma.applyForm.findFirst({ where: { active: true } });

    if (activeForm && activeForm.id !== id) {
      await this.prisma.applyForm.update({
        where: { id: activeForm.id },
        data:  { active: false },
      });
    }

    return this.prisma.applyForm.update({
      where: { id },
      data:  { active: true },
    });
  }
  async deactivateForm(id: number): Promise<ApplyForm> {
    return this.prisma.applyForm.update({
      where: { id },
      data:  { active: false },
    });
  }
  async createResponse(formId: number, user: MemberGuestPayload, data: CreateFormResponseDto): Promise<FormResponse> {
    try {
      const { studentId, name } = this.separateName(user.name);

      return await this.prisma.formResponse.create({
        data: {
          ...data,
          name:        name,
          studentId:   studentId.toString(),
          googleEmail: user.email,
          form:        { connect: { id: formId } },
        },
        include: { form: true },
      });
    } catch (error) {
      const prismaError = toTypedPrismaError(error);

      if (prismaError instanceof PrismaUniqueConstraintError) {
        throw new BadRequestException('이미 사용된 전화번호입니다.');
      }

      throw new InternalServerErrorException('응답을 삭제하는데 문제가 발생했습니다.', error?.message);
    }
  }
  async findResponse(formId: number, email: string): Promise<FormResponseWithPortfolio | null> {
    return this.prisma.formResponse.findFirst({
      where: {
        formId,
        googleEmail: email,
      },
      include: { portfolio: true },
    });
  }
  async updateResponse(formId: number, user: MemberGuestPayload, data: UpdateFormResponseDto): Promise<FormResponse> {
    const { uuid } = await this.findResponse(formId, user.email);

    try {
      return this.prisma.formResponse.update({
        where: { uuid },
        data,
      });
    } catch (error) {
      const prismaError = toTypedPrismaError(error);

      if (prismaError instanceof PrismaUniqueConstraintError) {
        throw new BadRequestException('이미 사용된 전화번호입니다.');
      }

      throw new InternalServerErrorException('응답을 수정하는데 문제가 발생했습니다', error?.message);
    }
  }
  async attachFileToResponse(formId: number, user: MemberGuestPayload, assetId: string): Promise<FormResponse> {
    const { uuid } = await this.findResponse(formId, user.email);

    return this.prisma.formResponse.update({
      where: { uuid },
      data:  { portfolio: { connect: { uuid: assetId } } },
    });
  }
  async removeFileFromResponse(formId: number, user: MemberGuestPayload): Promise<FormResponse> {
    const { uuid } = await this.findResponse(formId, user.email);

    return this.prisma.formResponse.update({
      where: { uuid },
      data:  { portfolio: { disconnect: true } },
    });
  }
  async deleteResponse(formId: number, user: MemberGuestPayload): Promise<FormResponse> {
    const { uuid } = await this.findResponse(formId, user.email);

    return this.prisma.formResponse.delete({ where: { uuid } });
  }
  async deleteResponseByID(responseId: string): Promise<FormResponse> {
    return this.prisma.formResponse.delete({ where: { uuid: responseId } });
  }
  async isResponseSubmitted(formId: number, user: MemberGuestPayload): Promise<boolean> {
    const data = await this.findResponse(formId, user.email);

    if (!data) {
      throw new BadRequestException('폼 응답을 찾을 수 없습니다.');
    }

    return data.submitted;
  }
  async submitResponse(formId: number, user: MemberGuestPayload): Promise<FormResponse> {
    const { uuid } = await this.findResponse(formId, user.email);

    return this.prisma.formResponse.update({
      where: { uuid },
      data:  { submitted: true },
    });
  }
  async isAvailableToAccessForm(formId: number): Promise<boolean> {
    const form = await this.prisma.applyForm.findUnique({ where: { id: formId } });
    const now = (new KSTDate).getDate();

    if (!form) {
      throw new BadRequestException('폼을 찾을 수 없습니다.');
    }

    return now >= form.startsAt && now <= form.endsAt && form.active;
  }
}

