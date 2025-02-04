import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ApplyFormDto } from '../dto/form.dto';
import { ApplyForm, MemberUnit, Prisma } from '@tapie-kr/api-database/client';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { FindFormsQueryDto } from '../dto/find-form-query.dto';

@Injectable()
export class ApplyFormRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: ApplyFormDto): Promise<ApplyForm> {
    try {
      return await this.prisma.applyForm.upsert({
        where: { googleEmail: data.googleEmail },
        create: data,
        update: data,
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to create/upsert form', error?.message);
    }
  }

  async findAll(query?: FindFormsQueryDto) {
    const { page = 1, limit = 10, name = '', unit } = query || {};
    const skip = (page - 1) * limit;

    const where: Prisma.ApplyFormWhereInput = {};

    if (name?.trim()) {
      where.name = { contains: name.trim() };
    }

    if (unit) {
      where.unit = unit;
    }

    const [total, forms] = await Promise.all([
      this.prisma.applyForm.count({ where }),
      this.prisma.applyForm.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),
    ]);

    return {
      items: forms,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(uuid: string): Promise<ApplyForm | null> {
    return this.prisma.applyForm.findUnique({
      where: { uuid },
    });
  }

  async remove(uuid: string): Promise<ApplyForm> {
    return this.prisma.applyForm.delete({
      where: { uuid },
    });
  }
}

export interface ApplyFormRepository {
  create(data: ApplyFormDto): Promise<ApplyForm>;
  findAll(query: FindFormsQueryDto): Promise<{
    items: ApplyForm[];
    meta: { total: number; page: number; limit: number; totalPages: number };
  }>;
  findOne(uuid: string): Promise<ApplyForm | null>;
  remove(uuid: string): Promise<ApplyForm>;
}
