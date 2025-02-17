import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';
import { MemberCompetitionDto } from '@/members/dto/member-competition.dto';

export class MemberAwardDto {
  @IsUUID()
  @ApiProperty({ description: '수상실적 UUID' })
  uuid: string;

  @IsUUID()
  @ApiProperty({ description: '대회 UUID' })
  competitionUUID: string;

  @IsString()
  @ApiProperty({ description: '수상명' })
  title: string;

  @IsNumber()
  @ApiProperty({ description: '수상 등급' })
  grade: number;

  @IsString()
  @ApiProperty({
    description: '수상 등급 이름', example: '우수상',
  })
  gradeLabel: string;

  @IsDate()
  @ApiProperty({ description: '수상일' })
  rewardedAt: Date;

  @ApiProperty({
    type: () => MemberCompetitionDto, isArray: true,
  })
  competition?: MemberCompetitionDto[];

  @IsDate()
  @ApiProperty({ description: '수상 데이터 생성일' })
  createdAt: Date;

  @IsDate()
  @ApiProperty({ description: '수상 데이터 수정일' })
  updatedAt: Date;
}
