import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateApplyFormDto, UpdateApplyFormDto } from '@/form/dto/form.dto';
import { CreateFormResponseDto, UpdateFormResponseDto } from '@/form/dto/response.dto';
import { ApplyFormRepository } from '@/form/repository/form.repository';

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
    try {
      await this.formRepository.remove(id);
    } catch (_error) {
      throw new NotFoundException('지원 폼을 찾을 수 없습니다');
    }
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
  async findOneResponse(responseId: string) {
    return this.formRepository.findOneResponse(responseId);
  }
  async getActiveForm() {
    return this.formRepository.getActiveForm();
  }
  async activateForm(id: number) {
    if (await this.formRepository.getActiveForm()) {
      throw new Error('이미 활성화된 폼이 있습니다. 활성화된 폼을 비활성화한 후 다시 시도해주세요.');
    }

    return this.formRepository.activateForm(id);
  }
  async deactivateForm(id: number) {
    return this.formRepository.deactivateForm(id);
  }
  async createResponse(formId: number, userId: string, data: CreateFormResponseDto) {
    return this.formRepository.createResponse(formId, userId, data);
  }
  async findResponse(responseId: string, userId: string) {
    return this.formRepository.findResponse(responseId, userId);
  }
  async updateResponse(responseId: string, userId: string, data: UpdateFormResponseDto) {
    return this.formRepository.updateResponse(responseId, userId, data);
  }
  async deleteResponse(responseId: string, userId: string) {
    return this.formRepository.deleteResponse(responseId, userId);
  }
}
