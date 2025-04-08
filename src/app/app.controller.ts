import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
	@Get('/error')
	getError() {
		throw new Error('This is a test error');
	}
}
