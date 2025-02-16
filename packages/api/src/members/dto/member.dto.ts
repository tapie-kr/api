import { ApiProperty } from '@nestjs/swagger';
import { MemberRole, MemberUnit } from '@tapie-kr/api-database';
import { IsEnum, IsNumber, IsString } from 'class-validator';

export class MemberPublicOnlyDto {
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

  @IsString()
  profileUri: string;
}
