import { ApiProperty, OmitType } from '@nestjs/swagger';
import { MemberRole, MemberUnit } from '@tapie-kr/api-database';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsString,
} from 'class-validator';

export class MemberDto {
  @IsNumber()
  @ApiProperty({
    description: '회원 ID', format: 'uuid',
  })
  uuid: string;

  @IsString()
  @ApiProperty({
    description: '회원 이름', example: 'Jeewon Kwon',
  })
  name: string;

  @IsString()
  @ApiProperty({
    description: '학번', example: '10912',
  })
  studentID: number;

  @IsString()
  @ApiProperty({
    description: '회원 아이디', example: 'jeewonkwon',
  })
  username: string;

  @IsString()
  @ApiProperty({
    description: '회원 이메일', example: 'noreply@tapie.kr',
  })
  googleEmail: string;

  @IsEnum(MemberRole)
  @ApiProperty({
    description: '회원 역할', example: MemberRole.MEMBER, enum: MemberRole,
  })
  role: MemberRole;

  @IsEnum(MemberUnit)
  @ApiProperty({
    description: '회원 유닛', example: MemberUnit.DEVELOPER, enum: MemberUnit,
  })
  unit: MemberUnit;

  @IsNumber()
  @ApiProperty({
    description: '기수', example: 119,
  })
  generation: number;

  @IsString()
  @ApiProperty({
    description: '프로필 URI', example: 'https://tapie.kr/profile.png',
  })
  profileUri: string;
}

export class MemberPreviewDto extends OmitType(MemberDto, [
  'googleEmail',
  'role',
  'unit',
  'generation',
  'profileUri',
] as const) {
}

export class CreateMemberDto extends OmitType(MemberDto, ['uuid', 'profileUri'] as const) {
}

export class PublicOnlyMemberDto extends OmitType(MemberDto, ['googleEmail'] as const) {
}

export class SpecificMemberDto extends MemberDto {
  @IsBoolean()
  @ApiProperty({
    description: '특정 멤버의 졸업 여부', example: false,
  })
  isGraduated: boolean;
}
