import { Module } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';
import { ApplyFormPrivateController } from '@/form/controllers/form.private.controller';
import { ApplyFormPublicController } from '@/form/controllers/form.public.controller';
import { ApplyFormService } from '@/form/form.service';
import { ApplyFormRepository } from '@/form/repository/form.repository';

@Module({
  imports:     [],
  controllers: [ApplyFormPrivateController, ApplyFormPublicController],
  providers:   [
    ApplyFormService,
    ApplyFormRepository,
    PrismaService,
  ],
  exports: [ApplyFormService, ApplyFormRepository],
})
export class FormModule {
}
