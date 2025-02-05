import { MemberUnit } from '@tapie-kr/api-database/client';
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
  name: string;

  @IsEnum(MemberUnit)
  unit: MemberUnit;

  @IsPhoneNumber()
  phoneNumber: string;

  @IsString()
  introduction: string;

  @IsString()
  motivation: string;

  @IsString()
  expectedActivities: string;

  @IsString()
  reasonToChoose: string;
}

export type CreateFormResponseDto = Omit<FormResponseDto, 'id'>;
export type UpdateFormResponseDtoType = Partial<CreateFormResponseDto>;
