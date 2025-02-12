import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
  async isResponseSubmitted(formId: number, userId: string) {
    return this.formRepository.isResponseSubmitted(formId, userId);
  }
  async deactivateForm(id: number) {
    return this.formRepository.deactivateForm(id);
  }
  async createResponse(formId: number, userId: string, data: CreateFormResponseDto) {
    const isAvailable = await this.formRepository.isAvailableToAccessForm(formId);

    if (!isAvailable) {
      throw new BadRequestException('지원 가능한 시간이 아닙니다');
    }

    return this.formRepository.createResponse(formId, userId, data);
  }
  async findResponse(formId: number, userId: string) {
    return this.formRepository.findResponse(formId, userId);
  }
  async updateResponse(formId: number, userId: string, data: UpdateFormResponseDto) {
    const isAvailable = await this.formRepository.isAvailableToAccessForm(formId);

    if (!isAvailable) {
      throw new BadRequestException('지원 가능한 시간이 아닙니다');
    }

    const isSubmitted = await this.formRepository.isResponseSubmitted(formId, userId);

    if (isSubmitted) {
      throw new BadRequestException('이미 제출한 응답은 수정할 수 없습니다');
    }

    return this.formRepository.updateResponse(formId, userId, data);
  }
  async removeResponse(formId: number, userId: string) {
    const isAvailable = await this.formRepository.isAvailableToAccessForm(formId);

    if (!isAvailable) {
      throw new BadRequestException('지원 가능한 시간이 아닙니다');
    }

    return this.formRepository.deleteResponse(formId, userId);
  }
  async submitResponse(formId: number, userId: string) {
    const isAvailable = await this.formRepository.isAvailableToAccessForm(formId);

    if (!isAvailable) {
      throw new BadRequestException('지원 가능한 시간이 아닙니다');
    }

    return this.formRepository.submitResponse(formId, userId);
  }
  async isAvailableToAccessForm(formId: number) {
    return this.formRepository.isAvailableToAccessForm(formId);
  }
}
