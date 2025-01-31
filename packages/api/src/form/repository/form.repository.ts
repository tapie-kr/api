import { Injectable, NotFoundException } from '@nestjs/common';
import { ApplyFormDto } from '../dto/form.dto';
import { ApplyForm } from '@tapie-kr/api-database/client';
import { PrismaService } from 'src/common/prisma/prisma.service'

@Injectable()
export class ApplyFormRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: ApplyFormDto): Promise<ApplyForm> {
    return this.prisma.applyForm.create({
      data,
    });
  }

  async findAll(): Promise<ApplyForm[]> {
    return this.prisma.applyForm.findMany();
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
  findAll(): Promise<ApplyForm[]>;
  findOne(uuid: string): Promise<ApplyForm | null>;
  remove(uuid: string): Promise<ApplyForm>;
}
