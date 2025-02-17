import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';
import { MemberAwardDto } from '@/members/dto/member-award.dto';

export class MemberCompetitionDto {
  @IsUUID()
  @ApiProperty({ description: '대회 UUID' })
  uuid: string;

  @IsString()
  @ApiProperty({ description: '대회 이름' })
  name: string;

  @ApiProperty({
    type: () => MemberAwardDto, isArray: true,
  })
  awards?: MemberAwardDto[];
}
