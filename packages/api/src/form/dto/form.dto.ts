import { IsString, IsEmail, IsEnum } from 'class-validator';
import { MemberUnit } from '@tapie-kr/api-database/client';

export class ApplyFormDto {
  @IsString()
  name: string;

  @IsEnum(MemberUnit)
  unit: MemberUnit;

  @IsEmail()
  googleEmail: string;

  @IsString()
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
