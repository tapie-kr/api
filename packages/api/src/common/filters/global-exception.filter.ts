import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common'
import { APIResponseDto } from '../dto/response.dto'
import { FastifyReply } from 'fastify'
import { ConfigService } from '@nestjs/config'

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name)
  private readonly configService = new ConfigService()

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<FastifyReply>()

    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR
    const message = exception.message || 'Internal Server Error'

    const apiResponse = new APIResponseDto()
    apiResponse.status = status
    apiResponse.message = message

    response.status(status).send(apiResponse)

    this.logger.error(exception)

    const isProduction = this.configService.get('NODE_ENV') === 'production'
    if (!isProduction) {
      console.error(exception)
    }
  }
}
