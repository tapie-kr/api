import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';

@Injectable()
export class AssetRepository {
  constructor(private readonly prisma: PrismaService) {
  }
  async createAsset(path: string, assetName?: string) {
    return this.prisma.asset.create({ data: {
      path, filename: assetName,
    } });
  }
  async getAsset(uuid: string) {
    return this.prisma.asset.findUnique({ where: { uuid } });
  }
  async removeAsset(uuid: string) {
    return this.prisma.asset.delete({ where: { uuid } });
  }
}
