import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class APIResponseDto<T> {
  @ApiProperty({ example: HttpStatus.OK })
  public status: HttpStatus;

  @ApiProperty({ example: 'OK' })
  public message: string;

  @ApiProperty({
    required: false, nullable: true,
  })
  public data: T;

  @ApiProperty({ example: (new Date).toISOString() })
  public responseAt: string;
}
