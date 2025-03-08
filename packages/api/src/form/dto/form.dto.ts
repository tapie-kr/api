import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsNumber,
  IsString,
} from 'class-validator';

export class FormDto {
  @IsNumber()
  @ApiProperty({
    description: '폼 ID', example: 1,
  })
  id: number;

  @IsString()
  @ApiProperty({
    description: '폼 이름', example: 'Sample Form',
  })
  name: string;

  @IsDateString()
  @ApiProperty({ description: '시작 날짜' })
  startsAt: Date;

  @IsDateString()
  @ApiProperty({ description: '종료 날짜' })
  endsAt: Date;

  @IsBoolean()
  @ApiProperty({ description: '활성화 여부' })
  active: boolean;
}

export type CreateFormType = Omit<FormDto, 'id'>;
export type UpdateFormType = Partial<CreateFormDto>;

export class FormPreviewDto extends FormDto {
  @IsBoolean()
  @ApiProperty({ description: '지원 가능 여부' })
  available: boolean;
}

export class CreateFormDto extends OmitType(FormDto, ['id'] as const) {
}

export class UpdateFormDto extends PartialType(CreateFormDto) {
}
