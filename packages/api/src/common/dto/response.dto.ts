import { HttpStatus } from '@nestjs/common';
import { KSTDate } from '@/common/utils/date';

export class APIResponseDto {
  public status: HttpStatus = HttpStatus.OK;

  public message: string = 'OK';

  public data: unknown = null;

  public responseAt: Date = new KSTDate;
}
