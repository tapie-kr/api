import { Injectable, NotFoundException } from '@nestjs/common';
import { ApplyFormDto } from './dto/form.dto';
import { ApplyFormRepository } from './repository/form.repository'

@Injectable()
export class ApplyFormService {
  constructor(private readonly formRepository: ApplyFormRepository) {}

  async create(createFormDto: ApplyFormDto) {
    return this.formRepository.create(createFormDto);
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