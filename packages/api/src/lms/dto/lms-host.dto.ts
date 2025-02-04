import { IsString } from 'class-validator';

export class HostDto {
  @IsString()
  id: string;

  @IsString()
  nickname: string;

  @IsString()
  username: string;

  @IsString()
  avatar: string;
}
