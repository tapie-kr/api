import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { UnitType } from '@/common/enum/unit-type';
import { HostDto } from '@/lms/dto/lms-host.dto';

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
