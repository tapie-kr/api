import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { SkillType } from '@tapie-kr/api-database';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsString,
  IsUUID,
} from 'class-validator';

export class SkillDto {
  @IsUUID()
  @ApiProperty({
    description: '기술 UUID', example: '123e4567-e89b-12d3-a456-426614174000',
  })
  uuid: string;

  @IsString()
  @ApiProperty({ description: '기술 아이콘 값' })
  icon: string;

  @IsString()
  @ApiProperty({ description: '기술 이름' })
  name: string;

  @IsEnum(SkillType)
  @ApiProperty({
    description: '기술 타입', enum: SkillType,
  })
  type: SkillType;

  @IsDate()
  @ApiProperty({ description: '기술 생성일' })
  createdAt: Date;

  @IsDate()
  @ApiProperty({ description: '기술 수정일' })
  updatedAt: Date;
}

export class CreateSkillDto extends OmitType(SkillDto, [
  'createdAt',
  'updatedAt',
  'uuid',
] as const) {
}

export class ConnectSkillDto extends PartialType(OmitType(SkillDto, ['createdAt', 'updatedAt'] as const)) {
}

export class MemberSkillDto {
  @IsUUID()
  @ApiProperty({ description: '멤버 기술 UUID' })
  uuid: string;

  @IsBoolean()
  @ApiProperty({ description: '멤버 기술 인증 여부' })
  isVerified: boolean;

  @IsBoolean()
  @ApiProperty({ description: '멤버 기술 학습중 여부' })
  isLearning: boolean;

  @ApiProperty({ type: () => SkillDto })
  skill: SkillDto;
}

export class CreateMemberSkillDto extends OmitType(MemberSkillDto, ['uuid', 'skill'] as const) {
  @ApiProperty({ type: () => ConnectSkillDto })
  skill: ConnectSkillDto;
}

export class UpdateMemberSkillDto extends PartialType(CreateMemberSkillDto) {
}
