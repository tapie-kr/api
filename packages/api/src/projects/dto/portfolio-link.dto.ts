import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { PortfolioLinkType } from '@tapie-kr/api-database';
import {
  IsDate,
  IsEnum,
  IsUrl,
  IsUUID,
} from 'class-validator';

export class PortfolioLinkDto {
  @IsUUID()
  @ApiProperty({
    description: '포트폴리오 링크 UUID', example: '123e4567-e89b-12d3-a456-426614174000',
  })
  uuid: string;

  @IsEnum(PortfolioLinkType)
  @ApiProperty({
    description: '포트폴리오 링크 타입', enum: PortfolioLinkType,
  })
  type: PortfolioLinkType;

  @IsUrl()
  @ApiProperty({
    description: '포트폴리오 링크 URL', example: 'https://example.com/',
  })
  href: string;

  @IsDate()
  @ApiProperty({ description: '포트폴리오 링크 생성일' })
  createdAt: Date;

  @IsDate()
  @ApiProperty({ description: '포트폴리오 링크 수정일' })
  updatedAt: Date;
}

export class ConnectPortfolioLinkDto extends PartialType(OmitType(PortfolioLinkDto, ['createdAt', 'updatedAt'] as const)) {
}

export class CreatePortfolioLinkDto extends OmitType(PortfolioLinkDto, [
  'uuid',
  'createdAt',
  'updatedAt',
] as const) {
}
