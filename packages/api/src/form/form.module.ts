import { Module } from '@nestjs/common';
import { ApplyFormController } from './form.controller'
import { ApplyFormService } from './form.service'

@Module({
  imports: [],
  controllers: [ApplyFormController],
  providers: [ApplyFormService],
})
export class ApplyFormModule {}