import { IsEmail, IsString } from 'class-validator'

export class GoogleAuthDto {
  @IsEmail()
  public email: string

  @IsString()
  public accessToken: string
}
