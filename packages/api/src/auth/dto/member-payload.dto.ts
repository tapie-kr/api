import { IsEmail, IsString } from 'class-validator';

export enum TokenType {
  ACCESS_TOKEN = 'accessToken',
  REFRESH_TOKEN = 'refreshToken',
}

export class MemberPayloadDto {
  @IsString()
  public type: TokenType;

  @IsString()
  public id?: string;

  @IsEmail()
  public email: string;

  @IsString()
  public name: string;
}
