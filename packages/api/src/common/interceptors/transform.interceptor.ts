import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpStatus } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Response } from 'express'
import { APIResponseDto } from '../dto/response.dto'

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse<Response>()
    return next.handle().pipe(
      map(data => {
        const apiResponse = new APIResponseDto()

        apiResponse.status = response.statusCode || HttpStatus.OK
        apiResponse.data = data

        response.status(HttpStatus.OK).send(apiResponse)
      }),
    )
  }
}
