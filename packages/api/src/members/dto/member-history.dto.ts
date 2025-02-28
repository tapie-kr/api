import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class MemberHistoryDto {
  @IsNumber()
  @ApiProperty({
    description: '기록 ID', format: 'id',
  })
  id: number;

  @IsString()
  @ApiProperty({
    description: '라벨 이름', example: 'Github',
  })
  label: string;

  @IsString()
  @ApiProperty({
    description: '라벨 링크', example: 'https://foo.bar/baz',
  })
  link: string;

  @ApiProperty({
    description: '중요함', example: true,
  })
  isImportant: boolean;

  @ApiProperty({
    description: '날짜', example: '2021-01-01',
  })
  releasedAt: Date;

  @ApiProperty({
    description: '생성일', example: '2021-01-01',
  })
  createdAt: Date;

  @ApiProperty({
    description: '수정일', example: '2021-01-01',
  })
  updatedAt: Date;
}
