import { Module } from '@nestjs/common';
import { ProfileLinkService } from '../service/profile-link.service';
import { ProfileLinkRepository } from '../repository/profile-link.repository';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { ProfileLinkController } from '../controller/profile-link.controller';

@Module({
  imports: [],
  controllers: [ProfileLinkController],
  providers: [ProfileLinkService, ProfileLinkRepository, PrismaService],
  exports: [ProfileLinkService],
})
export class ProfileLinkModule {}
