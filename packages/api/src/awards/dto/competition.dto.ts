import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';
import { AwardDto } from '@/awards/dto/award.dto';

export class CompetitionDto {
  @IsUUID()
  @ApiProperty({
    description: '대회 UUID', example: '123e4567-e89b-12d3-a456-426614174000',
  })
  uuid: string;

  @IsString()
  @ApiProperty({
    description: '대회 이름', example: 'STA+C 1981',
  })
  name: string;

  @ApiProperty({
    type: () => AwardDto, isArray: true,
  })
  awards?: AwardDto[];
}

export class CompetitionPreviewDto extends OmitType(CompetitionDto, ['awards'] as const) {
}

export class CreateCompetitionDto extends OmitType(CompetitionDto, ['uuid', 'awards'] as const) {
}

export class ConnectCompetitionDto extends PartialType(CompetitionPreviewDto) {
}
