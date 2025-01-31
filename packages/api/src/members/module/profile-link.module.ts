import { Module } from '@nestjs/common';
import { MemberProfileController } from '../controller/profile-link.controller';
import { ProfileLinkService } from '../service/profile-link.service';
import { ProfileLinkRepository } from '../repository/profile-link.repository';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Module({
  imports: [],
  controllers: [MemberProfileController],
  providers: [ProfileLinkService, ProfileLinkRepository, PrismaService],
  exports: [ProfileLinkService],
})
export class ProfileLinkModule {}
