import { Module } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';
import { ProfileLinkController } from '@/members/controller/profile-link.controller';
import { ProfileLinkRepository } from '@/members/repository/profile-link.repository';
import { ProfileLinkService } from '@/members/service/profile-link.service';

@Module({
  imports:     [],
  controllers: [ProfileLinkController],
  providers:   [
    ProfileLinkService,
    ProfileLinkRepository,
    PrismaService,
  ],
  exports: [ProfileLinkService],
})
export class ProfileLinkModule {
}
