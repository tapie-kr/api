import { Module } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { ApplyFormController } from './form.controller';
import { ApplyFormService } from './form.service';
import { ApplyFormRepository } from './repository/form.repository';

@Module({
  imports:     [],
  controllers: [ApplyFormController],
  providers:   [
    ApplyFormService,
    ApplyFormRepository,
    PrismaService,
  ],
  exports: [ApplyFormService, ApplyFormRepository],
})
export class FormModule {
}
