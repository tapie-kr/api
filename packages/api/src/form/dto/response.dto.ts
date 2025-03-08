import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { MemberUnit } from '@tapie-kr/api-database';
import {
  IsEnum,
  IsPhoneNumber,
  IsString,
  IsUUID,
} from 'class-validator';

export class FormResponseDto {
  @IsUUID()
  uuid: string;

  @IsString()
  @ApiProperty({ description: '이름' })
  name: string;

  @IsEnum(MemberUnit)
  @ApiProperty({
    description: '유닛', enum: MemberUnit,
  })
  unit: MemberUnit;

  @IsPhoneNumber()
  @ApiProperty({ description: '전화번호' })
  phoneNumber: string;

  @IsString()
  @ApiProperty({ description: '자기소개' })
  introduction: string;

  @IsString()
  @ApiProperty({ description: '지원동기' })
  motivation: string;

  @IsString()
  @ApiProperty({ description: '기대활동' })
  expectedActivities: string;

  @IsString()
  @ApiProperty({ description: '지원이유' })
  reasonToChoose: string;
}

export type CreateFormResponseDtoType = Omit<FormResponseDto, 'id'>;
export type UpdateFormResponseDtoType = Partial<CreateFormResponseDtoType>;

export class CreateFormResponseDto extends OmitType(FormResponseDto, ['uuid'] as const) {
}

export class UpdateFormResponseDto extends PartialType(CreateFormResponseDto) {
}
