import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';

export class ProfileLinkDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsUUID()
  @IsNotEmpty()
  memberUUID: string;

  @IsString()
  @IsNotEmpty()
  icon: string;

  @IsString()
  @IsNotEmpty()
  label: string;

  @IsString()
  @IsNotEmpty()
  href: string;
}

export type CreateProfileLinkDtoType = Omit<ProfileLinkDto, 'id'>;
export type UpdateProfileLinkDtoType = Omit<ProfileLinkDto, 'memberUUID' | 'id'>;
