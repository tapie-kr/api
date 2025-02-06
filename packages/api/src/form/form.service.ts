import { Injectable, NotFoundException } from '@nestjs/common';
import { type CreateApplyFormDto, type UpdateApplyFormDto } from '@/form/dto/form.dto';
import { type ApplyFormRepository } from '@/form/repository/form.repository';

@Injectable()
export class ApplyFormService {
  constructor(private readonly formRepository: ApplyFormRepository) {
  }
  async create(createFormDto: CreateApplyFormDto) {
    return this.formRepository.create(createFormDto);
  }
  async update(id: number, updateFormDto: UpdateApplyFormDto) {
    return this.formRepository.update(id, updateFormDto);
  }
  async remove(id: number) {
    return this.formRepository.remove(id);
  }
  async findAll() {
    return this.formRepository.findAll();
  }
  async findOne(id: number) {
    const form = await this.formRepository.findOne(id);

    if (!form) throw new NotFoundException('지원 폼을 찾을 수 없습니다');

    return form;
  }
  async findAllResponses(id: number) {
    return this.formRepository.findAllResponses(id);
  }
}
