import { PrismaService } from '@api/common/prisma/prisma.service';
import { ProfileLinkController } from '@api/members/controller/profile-link.controller';
import { ProfileLinkRepository } from '@api/members/repository/profile-link.repository';
import { ProfileLinkService } from '@api/members/service/profile-link.service';
import { Module } from '@nestjs/common';

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
