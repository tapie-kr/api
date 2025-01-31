import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateApplyFormDto } from '../dto/form.dto'
import { ApplyForm } from '@tapie-kr/api-database/client'

@Injectable()
export class ApplyFormService {
  constructor(private readonly formRepository: FormRepository) {}

  async create(createApplyFormDto: CreateApplyFormDto) {
    return this.formRepository.create(createApplyFormDto);
  }

  async findAll() {
    return this.formRepository.findAll();
  }

  async findOne(uuid: string) {
    const form = await this.formRepository.findOne(uuid);
    if (!form) throw new NotFoundException('지원서를 찾을 수 없습니다');
    return form;
  }

  async remove(uuid: string) {
    return this.formRepository.remove(uuid);
  }
}

export interface FormRepository {
    create(data: CreateApplyFormDto): Promise<ApplyForm>;
    findAll(): Promise<ApplyForm[]>;
    findOne(uuid: string): Promise<ApplyForm | null>;
    remove(uuid: string): Promise<ApplyForm>;
  }