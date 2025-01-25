import { MemberRole } from '@tapie-kr/api-database/client';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';

export class MemberPayloadDto {
  @IsString()
  public username: string;

  @IsEmail()
  public googleEmail: string;

  @IsEnum(MemberRole)
  public role: MemberRole;

  @IsString()
  public name: string;

  @IsOptional()
  @IsString()
  public unit?: string;

  @IsOptional()
  @IsString()
  public additionalTitle?: string;
}
