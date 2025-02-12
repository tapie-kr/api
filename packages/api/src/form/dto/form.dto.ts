import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsString } from 'class-validator';

export class ApplyFormDto {
  @IsNumber()
  id: number;

  @IsString()
  @ApiProperty({ description: '폼 이름' })
  name: string;

  @IsDateString()
  @ApiProperty({ description: '시작 날짜' })
  startsAt: Date;

  @IsDateString()
  @ApiProperty({ description: '종료 날짜' })
  endsAt: Date;
}

export type CreateApplyFormType = Omit<ApplyFormDto, 'id'>;
export type UpdateApplyFormType = Partial<CreateApplyFormDto>;

export class CreateApplyFormDto extends OmitType(ApplyFormDto, ['id'] as const) {
}

export class UpdateApplyFormDto extends PartialType(CreateApplyFormDto) {
}
