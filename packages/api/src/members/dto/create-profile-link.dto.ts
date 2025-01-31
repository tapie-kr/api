import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateProfileLinkDto {
  @ApiProperty({ description: '링크 아이콘' })
  @IsString()
  @IsNotEmpty()
  icon: string;

  @ApiProperty({ description: '링크 이름' })
  @IsString()
  @IsNotEmpty()
  label: string;

  @ApiProperty({ description: '링크 URL' })
  @IsString()
  @IsNotEmpty()
  url: string;

  @ApiProperty({ description: '프로필 UUID' })
  @IsUUID()
  @IsNotEmpty()
  memberUUID: string;
}
