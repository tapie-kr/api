import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
	@Get('/health')
	getHealth() {
		return { message: 'I am healthy!' };
	}

	@Get('/error')
	getError() {
		throw new Error('This is a test error');
	}
}
