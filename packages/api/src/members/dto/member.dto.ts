import { ApiProperty, OmitType } from '@nestjs/swagger';
import { MemberRole, MemberUnit } from '@tapie-kr/api-database';
import { IsEnum, IsNumber, IsString } from 'class-validator';

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
    description: '회원 역할', example: 'user', enum: MemberRole,
  })
  role: MemberRole;

  @IsEnum(MemberUnit)
  @ApiProperty({
    description: '회원 유닛', example: 'user', enum: MemberUnit,
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

export class CreateMemberDto extends OmitType(MemberDto, ['uuid', 'profileUri'] as const) {
}

export class PublicOnlyMemberDto extends OmitType(MemberDto, ['googleEmail'] as const) {
}
