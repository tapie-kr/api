import { IsDateString, IsEnum, IsNumber, IsString, ValidateNested } from 'class-validator';

import { Type } from 'class-transformer';
import { UnitType } from 'src/common/enum/unit-type';
import { ApiProperty } from '@nestjs/swagger';
import { HostDto } from './lms-host.dto';

export class LectureDto {
  @ApiProperty({
    description: '수업 ID',
    example: 'lectureId123',
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: '수업 호스트 정보',
    example: {
      id: 'host123',
      nickname: '김태영영',
      username: 'tyeongkim',
      avatar: 'c35fe23b48593b263af460ae1aa02cdd',
    },
  })
  @ValidateNested()
  @Type(() => HostDto)
  host: HostDto;

  @ApiProperty({
    description: '수업를 진행하는 유닛',
    example: UnitType.DESIGNER,
  })
  @IsEnum(UnitType)
  unit: UnitType;

  @ApiProperty({
    description: '수업 시작 시간',
    example: 1738297059,
  })
  @IsNumber()
  startTime: number;
}
