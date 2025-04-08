import { APIResponseDto } from '@/common/dto/response.dto';
import {
	type ArgumentsHost,
	BadRequestException,
	Catch,
	type ExceptionFilter,
	HttpException,
	HttpStatus,
	Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SentryExceptionCaptured } from '@sentry/nestjs';
import type { Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
	private readonly logger = new Logger(GlobalExceptionFilter.name);
	private readonly configService = new ConfigService();

	@SentryExceptionCaptured()
	catch(exception: Error, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();

		const status =
			exception instanceof HttpException
				? exception.getStatus()
				: HttpStatus.INTERNAL_SERVER_ERROR;

		const message = exception.message || 'Internal Server Error';
		const apiResponse = new APIResponseDto();

		apiResponse.status = status;

		if (exception instanceof BadRequestException) {
			const exceptionResponse = exception.getResponse() as {
				message: Array<string> | string;
			};

			const messages =
				typeof exceptionResponse.message === 'string'
					? [exceptionResponse.message]
					: exceptionResponse.message;

			apiResponse.message = messages.join(', ');
		} else {
			apiResponse.message = message;
		}

		response.status(status).send(apiResponse);

		this.logger.error(exception);

		const isProduction = this.configService.get('NODE_ENV') === 'production';

		if (!isProduction) {
			console.error(exception);
		}
	}
}
