import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ApplyForm, Asset, FormResponse } from '@tapie-kr/api-database';
import { PrismaRelationViolationError, PrismaUniqueConstraintError, toTypedPrismaError } from '@/common/prisma/prisma.exception';
import { PrismaService } from '@/common/prisma/prisma.service';
import { CreateApplyFormDto, UpdateApplyFormDto } from '@/form/dto/form.dto';
import { CreateFormResponseDto, UpdateFormResponseDto } from '@/form/dto/response.dto';

type FormResponseWithPortfolio = FormResponse & {
  portfolio: Asset | null;
};

@Injectable()
export class ApplyFormRepository {
  constructor(private readonly prisma: PrismaService) {
  }
  async create(data: CreateApplyFormDto): Promise<ApplyForm> {
    try {
      return await this.prisma.applyForm.create({ data });
    } catch (error) {
      throw new InternalServerErrorException('Failed to create form', error?.message);
    }
  }
  async update(id: number, data: UpdateApplyFormDto): Promise<ApplyForm> {
    try {
      return await this.prisma.applyForm.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to update form', error?.message);
    }
  }
  async remove(id: number): Promise<void> {
    await this.prisma.applyForm.delete({ where: { id } });
  }
  async findOne(id: number): Promise<ApplyForm | null> {
    return this.prisma.applyForm.findUnique({ where: { id } });
  }
  async findAll(): Promise<ApplyForm[]> {
    return this.prisma.applyForm.findMany();
  }
  async findAllResponses(id: number): Promise<{
    responses: FormResponse[];
  }> {
    return this.prisma.applyForm.findUnique({
      where:   { id },
      include: { responses: true },
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
  async createResponse(formId: number, userId: string, data: CreateFormResponseDto): Promise<FormResponse> {
    try {
      return await this.prisma.formResponse.create({
        data: {
          ...data,
          form:   { connect: { id: formId } },
          member: { connect: { uuid: userId } },
        },
        include: {
          member: true, form: true,
        },
      });
    } catch (error) {
      const prismaError = toTypedPrismaError(error);

      if (prismaError instanceof PrismaUniqueConstraintError) {
        throw new BadRequestException('이미 사용된 전화번호입니다.');
      }

      if (prismaError instanceof PrismaRelationViolationError) {
        throw new BadRequestException('이미 폼 응답을 생성했습니다.');
      }

      throw new InternalServerErrorException('Failed to create response', error?.message);
    }
  }
  async findResponse(formId: number, userId: string): Promise<FormResponseWithPortfolio | null> {
    return this.prisma.formResponse.findFirst({
      where: {
        formId,
        memberUUID: userId,
      },
      include: { portfolio: true },
    });
  }
  async updateResponse(formId: number, userId: string, data: UpdateFormResponseDto): Promise<FormResponse> {
    const { uuid } = await this.findResponse(formId, userId);

    try {
      return this.prisma.formResponse.update({
        where:   { uuid },
        data,
        include: { member: true },
      });
    } catch (error) {
      const prismaError = toTypedPrismaError(error);

      if (prismaError instanceof PrismaUniqueConstraintError) {
        throw new BadRequestException('이미 사용된 전화번호입니다.');
      }

      throw new InternalServerErrorException('Failed to update response', error?.message);
    }
  }
  async attachFileToResponse(formId: number, userId: string, assetId: string): Promise<FormResponse> {
    const { uuid } = await this.findResponse(formId, userId);

    return this.prisma.formResponse.update({
      where: { uuid },
      data:  { portfolio: { connect: { uuid: assetId } } },
    });
  }
  async removeFileFromResponse(formId: number, userId: string): Promise<FormResponse> {
    const { uuid } = await this.findResponse(formId, userId);

    return this.prisma.formResponse.update({
      where: { uuid },
      data:  { portfolio: { disconnect: true } },
    });
  }
  async deleteResponse(formId: number, userId: string): Promise<FormResponse> {
    const { uuid } = await this.findResponse(formId, userId);

    return this.prisma.formResponse.delete({ where: { uuid } });
  }
  async isResponseSubmitted(formId: number, userId: string): Promise<boolean> {
    const data = await this.findResponse(formId, userId);

    return data.submitted;
  }
  async submitResponse(formId: number, userId: string): Promise<FormResponse> {
    const { uuid } = await this.findResponse(formId, userId);

    return this.prisma.formResponse.update({
      where: { uuid },
      data:  { submitted: true },
    });
  }
  async isAvailableToAccessForm(formId: number): Promise<boolean> {
    const form = await this.prisma.applyForm.findUnique({ where: { id: formId } });
    const now = new Date;

    return now >= form.startsAt && now <= form.endsAt;
  }

  /*
   * async create(data: ApplyFormDto): Promise<AppldddyForm> {
   *   try {
   *     return await this.prisma.applyForm.upsert({
   *       where: { googleEmail: data.googleEmail },
   *       create: data,
   *       update: data,
   *     });
   *   } catch (error) {
   *     throw new InternalServerErrorException('Failed to create/upsert form', error?.message);
   *   }
   * }
   *
   * async findAll(query?: FindFormsQueryDto) {
   *   const { page = 1, limit = 10, name = '', unit } = query || {};
   *   const skip = (page - 1) * limit;
   *
   *   const where: Prisma.ApplyFormWhereInput = {};
   *
   *   if (name?.trim()) {
   *     where.name = { contains: name.trim() };
   *   }
   *
   *   if (unit) {
   *     where.unit = unit;
   *   }
   *
   *   const [total, forms] = await Promise.all([
   *     this.prisma.applyForm.count({ where }),
   *     this.prisma.applyForm.findMany({
   *       where,
   *       skip,
   *       take: limit,
   *       orderBy: {
   *         createdAt: 'desc',
   *       },
   *     }),
   *   ]);
   *
   *   return {
   *     items: forms,
   *     meta: {
   *       total,
   *       page,
   *       limit,
   *       totalPages: Math.ceil(total / limit),
   *     },
   *   };
   * }
   *
   * async findOne(uuid: string): Promise<ApplyForm | null> {
   *   return this.prisma.applyForm.findUnique({
   *     where: { uuid },
   *   });
   * }
   *
   * async remove(uuid: string): Promise<ApplyForm> {
   *   return this.prisma.applyForm.delete({
   *     where: { uuid },
   *   });
   * }
   */
}

/*
 * export interface ApplyFormRepository {
 *   create(data: ApplyFormDto): Promise<ApplyForm>;
 *   findAll(query: FindFormsQueryDto): Promise<{
 *     items: ApplyForm[];
 *     meta: { total: number; page: number; limit: number; totalPages: number };
 *   }>;
 *   findOne(uuid: string): Promise<ApplyForm | null>;
 *   remove(uuid: string): Promise<ApplyForm>;
 * }
 */
