import { ApiProperty, OmitType } from '@nestjs/swagger';
import {
  IsDate,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';
import { CompetitionPreviewDto, ConnectCompetitionDto } from '@/awards/dto/competition.dto';
import { MemberPreviewDto } from '@/members/dto/member.dto';

export class AwardDto {
  @IsUUID()
  @ApiProperty({
    description: '수상실적 UUID', example: '123e4567-e89b-12d3-a456-426614174000',
  })
  uuid: string;

  @IsUUID()
  @ApiProperty({
    description: '대회 UUID', example: '123e4567-e89b-12d3-a456-426614174000',
  })
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
    type: () => CompetitionPreviewDto, isArray: true,
  })
  competition?: CompetitionPreviewDto[];

  @ApiProperty({
    type: () => MemberPreviewDto, isArray: true,
  })
  members?: MemberPreviewDto[];

  @IsDate()
  @ApiProperty({ description: '수상 데이터 생성일' })
  createdAt: Date;

  @IsDate()
  @ApiProperty({ description: '수상 데이터 수정일' })
  updatedAt: Date;
}

export class CreateAwardDto extends OmitType(AwardDto, [
  'competition',
  'members',
  'createdAt',
  'updatedAt',
  'uuid',
  'competitionUUID',
  'competition',
] as const) {
  @ApiProperty({ type: () => ConnectCompetitionDto })
  competition: ConnectCompetitionDto;

  @ApiProperty({
    type:  'array',
    items: {
      type: 'string', example: '123e4567-e89b-12d3-a456-426614174000',
    },
  })
  membersUUID?: string[];
}
