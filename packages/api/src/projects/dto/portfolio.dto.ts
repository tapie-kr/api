import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { PortfolioTag } from '@tapie-kr/api-database';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsDateString,
  IsEnum,
  IsNumber,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { CompetitionDto, ConnectCompetitionDto } from '@/portfolio/dto/competition.dto';
import { ConnectPortfolioLinkDto, PortfolioLinkDto } from '@/projects/dto/portfolio-link.dto';
import { ConnectPortfolioMemberDto, PreviewPortfolioMemberDto } from '@/projects/dto/portfolio-member.dto';

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

  @ApiProperty({
    enum:        PortfolioTag,
    isArray:     true,
    description: '포트폴리오에 연결된 태그',
    example:     [PortfolioTag.DESIGN, PortfolioTag.WEB],
  })
  @IsArray()
  @IsEnum(PortfolioTag, { each: true })
  tags: PortfolioTag[];

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
    type:        () => PreviewPortfolioMemberDto,
    isArray:     true,
    description: '포트폴리오에 연결된 멤버',
  })
  members: PreviewPortfolioMemberDto[];

  @ApiProperty({
    type:        () => CompetitionDto,
    description: '포트폴리오에 연결된 대회',
    nullable:    true,
  })
  competition?: CompetitionDto;

  @IsDateString()
  @ApiProperty({ description: '포트폴리오 프로젝트 생성일' })
  releasedAt: Date;

  @IsDate()
  @ApiProperty({ description: '포트폴리오 생성일' })
  createdAt: Date;

  @IsDate()
  @ApiProperty({ description: '포트폴리오 수정일' })
  updatedAt: Date;
}

export class PreviewPortfolioDto extends PortfolioDto {
  @ApiProperty({
    description: '포트폴리오 대표 썸네일 이미지 URL', example: 'https://example.com/thumbnail.png',
  })
  representativeThumbnailUrl: string;

  @ApiProperty({
    description: '포트폴리오 대표 썸네일들',
    type:        'array',
    items:       { type: 'string' },
    example:     ['https://example.com/thumbnail1.png', 'https://example.com/thumbnail2.png'],
  })
  @IsArray()
  thumbnailUrls: string[];
}

export class PublicPreviewPortfolioDto extends OmitType(PreviewPortfolioDto, [
  'links',
  'members',
  'competition',
] as const) {
  @ApiProperty({ description: '포트폴리오 관련 수상여부' })
  @IsBoolean()
  isAwarded: boolean;
}

export class UpdatePortfolioDto extends PartialType(OmitType(PortfolioDto, [
  'uuid',
  'links',
  'members',
  'competition',
  'createdAt',
  'updatedAt',
] as const)) {
  @ApiProperty({ description: '대표 썸네일 사진 번째' })
  @IsNumber()
  representativeThumbnail: number;
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
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ConnectPortfolioMemberDto)
  members: ConnectPortfolioMemberDto[];

  @ApiProperty({
    type:        () => ConnectPortfolioLinkDto,
    isArray:     true,
    description: '포트폴리오에 연결할 링크',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ConnectPortfolioLinkDto)
  links: ConnectPortfolioLinkDto[];

  @ApiProperty({
    type:        () => ConnectCompetitionDto,
    description: '포트폴리오에 연결할 대회',
  })
  @ValidateNested({})
  @Type(() => ConnectCompetitionDto)
  competition: ConnectCompetitionDto;
}
