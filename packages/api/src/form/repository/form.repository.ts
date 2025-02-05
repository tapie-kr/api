import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { type ApplyForm, type FormResponse } from '@tapie-kr/api-database/client';
import { type PrismaService } from 'src/common/prisma/prisma.service';
import { type CreateApplyFormDto, type UpdateApplyFormDto } from '../dto/form.dto';

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
  async remove(id: number): Promise<ApplyForm> {
    try {
      return await this.prisma.applyForm.delete({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete form', error?.message);
    }
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

  /*
   * async create(data: ApplyFormDto): Promise<ApplyForm> {
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
