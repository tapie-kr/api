import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUUID, IsNumber } from 'class-validator';

export class UpdateProfileLinkDto {
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
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
