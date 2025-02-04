import { IsDateString, IsEnum, IsNumber, IsString, ValidateNested } from 'class-validator';

import { Type } from 'class-transformer';
import { UnitType } from 'src/common/enum/unit-type';
import { HostDto } from './lms-host.dto';

export class LectureDto {
  @IsString()
  id: string;

  @ValidateNested()
  @Type(() => HostDto)
  host: HostDto;

  @IsEnum(UnitType)
  unit: UnitType;

  @IsNumber()
  startTime: number;
}
