import { ApiProperty, IntersectionType, OmitType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { MemberPreviewDto } from '@/members/dto/member.dto';
import { CompetitionPreviewDto, ConnectCompetitionDto } from '@/portfolio/dto/competition.dto';

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

  @IsDateString()
  @ApiProperty({ description: '수상일' })
  rewardedAt: Date;

  @ApiProperty({ type: () => CompetitionPreviewDto })
  competition?: CompetitionPreviewDto;

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

export class PreviewAwardDto extends OmitType(AwardDto, [
  'competition',
  'members',
  'createdAt',
  'updatedAt',
] as const) {
}

export class CreateAwardAdditionalDto {
  @ApiProperty({ type: () => ConnectCompetitionDto })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ConnectCompetitionDto)
  competition: ConnectCompetitionDto;

  @ApiProperty({
    type:  'array',
    items: {
      type: 'string', example: '123e4567-e89b-12d3-a456-426614174000',
    },
  })
  @IsNotEmpty()
  membersUUID?: string[];
}

export class CreateAwardBaseDto extends OmitType(AwardDto, [
  'competition',
  'members',
  'createdAt',
  'updatedAt',
  'uuid',
  'competitionUUID',
  'competition',
] as const) {
}

export class CreateAwardDto extends IntersectionType(CreateAwardBaseDto, CreateAwardAdditionalDto) {

}

export class AddMemberAwardDto extends OmitType(CreateAwardDto, [
  'title',
  'grade',
  'gradeLabel',
  'rewardedAt',
] as const) {
}

export class AwardPublicPreviewDto {
  @IsUUID()
  @ApiProperty({
    description: '수상실적 UUID', example: '123e4567-e89b-12d3-a456-426614174000',
  })
  uuid: string;

  @IsString()
  @ApiProperty({
    description: '수상명', example: 'SW동행 해커톤 우수상',
  })
  fullTitle: string;

  @IsArray()
  @ApiProperty({
    description: '수상 멤버 목록 (이름만)', example: ['권지원', '조성주'],
  })
  memberNames: string[];
}

