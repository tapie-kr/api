import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsString } from 'class-validator';

export class ApplyFormDto {
  @IsNumber()
  @ApiProperty({
    description: '폼 ID', example: 1,
  })
  id: number;

  @IsString()
  @ApiProperty({
    description: '폼 이름', example: 'Sample Form',
  })
  name: string;

  @IsDateString()
  @ApiProperty({ description: '시작 날짜' })
  startsAt: Date;

  @IsDateString()
  @ApiProperty({ description: '종료 날짜' })
  endsAt: Date;
}

export type CreateFormType = Omit<ApplyFormDto, 'id'>;
export type UpdateFormType = Partial<CreateFormDto>;

export class CreateFormDto extends OmitType(ApplyFormDto, ['id'] as const) {
}

export class UpdateFormDto extends PartialType(CreateFormDto) {
}
