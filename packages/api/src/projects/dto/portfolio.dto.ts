import { ApiProperty, OmitType } from '@nestjs/swagger';
import { PortfolioTag } from '@tapie-kr/api-database';
import {
  IsDate,
  IsEnum,
  IsString,
  IsUUID,
} from 'class-validator';
import { CompetitionDto, ConnectCompetitionDto } from '@/portfolio/dto/competition.dto';
import { ConnectPortfolioLinkDto, PortfolioLinkDto } from '@/projects/dto/portfolio-link.dto';
import { ConnectPortfolioMemberDto, PortfolioMemberDto } from '@/projects/dto/portfolio-member.dto';

export class PortfolioDto {
  @IsUUID()
  @ApiProperty({
    description: '포트폴리오 UUID', example: '123e4567-e89b-12d3-a456-426614174000',
  })
  uuid: string;

  @IsString()
  @ApiProperty({
    description: '포트폴리오 이름', example: 'TAPIE Inspire',
  })
  name: string;

  @IsString()
  @ApiProperty({
    description: '포트폴리오 캐치프레이즈', example: 'TAPIE Inspire Kit입니다',
  })
  catchPhrase: string;

  @IsString()
  @ApiProperty({
    description: '포트폴리오 설명', example: 'TAPIE Inspire Kit은 TAPIE의 디자인 시스템입니다',
  })
  description: string;

  @IsEnum(PortfolioTag)
  @ApiProperty({
    description: '포트폴리오 태그', enum: PortfolioTag, example: PortfolioTag.DESIGN,
  })
  tag: PortfolioTag;

  @IsString()
  @ApiProperty({
    description: '포트폴리오 효과 색 (hex color)', example: '8ecae6',
  })
  thumbnailEffectColor?: string;

  @ApiProperty({
    type:        () => PortfolioLinkDto,
    isArray:     true,
    description: '포트폴리오에 연결된 링크',
  })
  links: PortfolioLinkDto[];

  @ApiProperty({
    type:        () => PortfolioMemberDto,
    isArray:     true,
    description: '포트폴리오에 연결된 멤버',
  })
  members: PortfolioMemberDto[];

  @ApiProperty({
    type:        () => CompetitionDto,
    description: '포트폴리오에 연결된 대회',
  })
  competition: CompetitionDto;

  @IsDate()
  @ApiProperty({ description: '포트폴리오 프로젝트 생성일' })
  releasedAt: Date;

  @IsDate()
  @ApiProperty({ description: '포트폴리오 생성일' })
  createdAt: Date;

  @IsDate()
  @ApiProperty({ description: '포트폴리오 수정일' })
  updatedAt: Date;
}

export class CreatePortfolioDto extends OmitType(PortfolioDto, [
  'uuid',
  'links',
  'members',
  'competition',
  'createdAt',
  'updatedAt',
] as const) {
  @ApiProperty({
    type:        () => ConnectPortfolioMemberDto,
    isArray:     true,
    description: '포트폴리오에 연결할 멤버',
  })
  members: ConnectPortfolioMemberDto[];

  @ApiProperty({
    type:        () => ConnectPortfolioLinkDto,
    isArray:     true,
    description: '포트폴리오에 연결할 링크',
  })
  links: ConnectPortfolioLinkDto[];

  @ApiProperty({
    type:        () => ConnectCompetitionDto,
    description: '포트폴리오에 연결할 대회',
  })
  competition: ConnectCompetitionDto;
}

export class CreatePortfolioPrismaDto extends OmitType(CreatePortfolioDto, ['members'] as const) {
}
