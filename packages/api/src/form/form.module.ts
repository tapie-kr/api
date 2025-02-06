import { Module } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';
import { ApplyFormController } from '@/form/form.controller';
import { ApplyFormService } from '@/form/form.service';
import { ApplyFormRepository } from '@/form/repository/form.repository';

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
