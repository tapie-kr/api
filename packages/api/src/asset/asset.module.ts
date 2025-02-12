import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AssetRepository } from '@/asset/asset.repository';
import { PrismaService } from '@/common/prisma/prisma.service';
import { AssetService } from './asset.service';

@Module({
  imports:   [ConfigModule],
  providers: [
    AssetService,
    AssetRepository,
    PrismaService,
  ],
  exports: [AssetService],
})
export class AssetModule {
}
