import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export enum TokenType {
  ACCESS_TOKEN = 'accessToken',
  REFRESH_TOKEN = 'refreshToken',
}

export class MemberPayloadDto {
  @IsString()
  @ApiProperty({ enum: TokenType })
  public type: TokenType;

  @IsString()
  @ApiPropertyOptional({ format: 'uuid' })
  public id?: string;

  @IsEmail()
  @ApiProperty({ format: 'email' })
  public email: string;

  @IsString()
  @ApiProperty()
  public name: string;
}

export type MemberGuestPayload = Omit<MemberPayloadDto, 'id'>;

export class MemberPayloadWithoutTypeDto extends OmitType(MemberPayloadDto, ['type'] as const) {
}
