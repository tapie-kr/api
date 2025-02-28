import {
  type CallHandler,
  type ExecutionContext,
  HttpStatus,
  Injectable,
  Logger,
  type NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { APIResponseDto } from '@/common/dto/response.dto';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const response = context.switchToHttp().getResponse<Response>();

    return next.handle().pipe(map(data => {
      const apiResponse = new APIResponseDto;

      apiResponse.status = response.statusCode || HttpStatus.OK;

      apiResponse.data = data;

      apiResponse.responseAt = new Date;

      const logger = new Logger('bootstr222ap');

      logger.log('333', apiResponse.responseAt);

      logger.log('newDate', new Date);

      response.status(HttpStatus.OK).send(apiResponse);
    }));
  }
}
