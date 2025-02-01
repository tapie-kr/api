import { IsString, IsEmail, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { MemberUnit } from '@tapie-kr/api-database/client'

export class ApplyFormDto {
  @ApiProperty({ description: '지원자 이름' })
  @IsString()
  name: string;

  @ApiProperty({ enum: MemberUnit, description: '지원 유닛' })
  @IsEnum(MemberUnit)
  unit: MemberUnit;

  @ApiProperty({ description: '구글 이메일' })
  @IsEmail()
  googleEmail: string;

  @ApiProperty({ description: '전화번호' })
  @IsString()
  phoneNumber: string;

  @ApiProperty({ description: '자기소개' })
  @IsString()
  introduction: string;

  @ApiProperty({ description: '지원 동기' })
  @IsString()
  motivation: string;

  @ApiProperty({ description: '기대하는 활동' })
  @IsString()
  expectedActivities: string;

  @ApiProperty({ description: '지원 이유' })
  @IsString()
  reasonToChoose: string;
}