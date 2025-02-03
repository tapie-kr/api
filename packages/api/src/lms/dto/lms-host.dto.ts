import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator';

export class HostDto {
    @ApiProperty({
      description: '호스트 ID',
      example: 'host123',
    })
    @IsString()
    id: string;
  
    @ApiProperty({
      description: '호스트 닉네임',
      example: '김태영',
    })
    @IsString()
    nickname: string;
  
    @ApiProperty({
      description: '호스트 사용자명',
      example: 'tyeongkim',
    })
    @IsString()
    username: string;
  
    @ApiProperty({
      description: '호스트 프로필 이미지 ID',
      example: 'c35fe23b48593b263af460ae1aa02cdd',
    })
    @IsString()
    avatar: string;
  }