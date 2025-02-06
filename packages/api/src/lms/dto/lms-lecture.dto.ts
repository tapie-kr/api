import { UnitType } from '@api/common/enum/unit-type';
import { HostDto } from '@api/lms/dto/lms-host.dto';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

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
