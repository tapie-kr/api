import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUUID, IsNumber } from 'class-validator';

export class ProfileLinkDto {
  @ApiProperty({ description: '링크 고유 UUID' })
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty({ description: '프로필 UUID' })
  @IsUUID()
  @IsNotEmpty()
  memberUUID: string;

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
  href: string;
}

export type CreateProfileLinkDtoType = Omit<ProfileLinkDto, 'id'>;
export type UpdateProfileLinkDtoType = Omit<ProfileLinkDto, 'memberUUID' | 'id'>;