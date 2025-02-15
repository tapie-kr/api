import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { AssetModule } from '@/asset/asset.module';
import { PrismaService } from '@/common/prisma/prisma.service';
import { ApplyFormPrivateController } from '@/form/controllers/form.private.controller';
import { ApplyFormPublicController } from '@/form/controllers/form.public.controller';
import { ApplyFormService } from '@/form/form.service';
import { ApplyFormRepository } from '@/form/repository/form.repository';
import { MembersModule } from '@/members/members.module';
import { MembersService } from '@/members/service/members.service';

@Module({
  imports: [
    AssetModule,
    CacheModule.register(),
    MembersModule,
  ],
  controllers: [ApplyFormPrivateController, ApplyFormPublicController],
  providers:   [
    ApplyFormService,
    ApplyFormRepository,
    PrismaService,
    MembersService,
  ],
  exports: [ApplyFormService, ApplyFormRepository],
})
export class FormModule {
}
