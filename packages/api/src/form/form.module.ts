import { PrismaService } from '@api/common/prisma/prisma.service';
import { ApplyFormController } from '@api/form/form.controller';
import { ApplyFormService } from '@api/form/form.service';
import { ApplyFormRepository } from '@api/form/repository/form.repository';
import { Module } from '@nestjs/common';

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
