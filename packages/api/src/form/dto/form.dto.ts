import { IsDate, IsNumber, IsString } from 'class-validator';

export class ApplyFormDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsDate()
  startsAt: Date;

  @IsDate()
  endsAt: Date;
}

export type CreateApplyFormDto = Omit<ApplyFormDto, 'id'>;
export type UpdateApplyFormDto = Partial<CreateApplyFormDto>;
