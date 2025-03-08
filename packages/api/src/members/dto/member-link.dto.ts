import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsNumber, IsString, IsUrl } from 'class-validator';

export class MemberLinkDto {
  @IsNumber()
  @ApiProperty({ description: '링크 ID' })
  id: number;

  @IsString()
  @ApiProperty({ description: '링크 아이콘' })
  icon: string;

  @IsString()
  @ApiProperty({ description: '링크 라벨' })
  label: string;

  @IsUrl()
  @ApiProperty({ description: '링크 URL' })
  href: string;
}

export class CreateMemberLinkDto extends OmitType(MemberLinkDto, ['id'] as const) {
}

export class UpdateMemberLinkDto extends PartialType(CreateMemberLinkDto) {
}
