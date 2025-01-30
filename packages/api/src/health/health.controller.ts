import { Controller, Get } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger'
import { HealthDto } from './dto/health.dto'

@Controller('health')
export class HealthController {
  @ApiResponse({
    status: 200,
    description: '서버가 정상적으로 작동합니다.',
    
    type: HealthDto,
  })
  @Get()
  check() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }
}
