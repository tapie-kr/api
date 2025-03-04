import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsDate, IsString, IsUUID } from 'class-validator';

export class PortfolioMemberDto {
  @IsUUID()
  @ApiProperty({
    description: '포트폴리오 멤버 UUID', example: '123e4567-e89b-12d3-a456-426614174000',
  })
  uuid: string;

  @IsString()
  @ApiProperty({
    description: '포트폴리오 멤버 이름', example: '권지원',
  })
  name: string;

  @IsString()
  @ApiProperty({
    description: '포트폴리오 멤버 역할', example: '개발자',
  })
  role: string;

  @IsString()
  @ApiProperty({
    description: '포트폴리오 멤버 설명', example: '프론트엔드 개발을 담당했습니다.',
  })
  description: string;

  @IsDate()
  @ApiProperty({ description: '포트폴리오 멤버 생성일' })
  createdAt: Date;

  @IsDate()
  @ApiProperty({ description: '포트폴리오 멤버 수정일' })
  updatedAt: Date;
}

export class PreviewPortfolioMemberDto extends PortfolioMemberDto {
  @ApiProperty({
    description: '포트폴리오 멤버 프로필 이미지', example: 'https://s3.example.com/profile.png',
  })
  profileImageUrl: string;

  @ApiProperty({
    description: '포트폴리오 멤버 USERNAME', example: 'iamfiro',
  })
  username: string;
}

export class CreatePortfolioMemberDto extends OmitType(PortfolioMemberDto, [
  'uuid',
  'createdAt',
  'updatedAt',
] as const) {
}

export class ConnectPortfolioMemberDto extends PartialType(OmitType(PortfolioMemberDto, ['createdAt', 'updatedAt'] as const)) {
}

export class ConnectOriginMemberDto {
  @IsString()
  @ApiProperty({
    description: '연결할 멤버의 UUID', example: '123e4567-e89b-12d3-a456-426614174000',
  })
  uuid: string;
}
