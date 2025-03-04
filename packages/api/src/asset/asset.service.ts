import {
  Cache,
  CACHE_MANAGER,
  CacheInterceptor,
  CacheTTL,
} from '@nestjs/cache-manager';
import { Inject, Injectable, UseInterceptors } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client as MinioClient } from 'minio';
import { AssetRepository } from '@/asset/asset.repository';
import { FileType } from '@/asset/types/fileType';

@Injectable()
@UseInterceptors(CacheInterceptor)
export class AssetService {
  private readonly minioClient: MinioClient;
  private readonly PRESIGNED_URL_EXPIRY = 2 * 60 * 60;

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly configService: ConfigService,
    private readonly assetRepository: AssetRepository) {
    this.minioClient = new MinioClient({
      endPoint:  this.configService.get('MINIO_URL'),
      useSSL:    true,
      accessKey: this.configService.get('MINIO_ACCESS_KEY'),
      secretKey: this.configService.get('MINIO_SECRET_KEY'),
    });
  }
  @CacheTTL(1800)
  async getPresignedUrl(uuid: string) {
    const asset = await this.assetRepository.getAsset(uuid);
    const presignedUrl = await this.minioClient.presignedUrl('GET', this.configService.get('MINIO_BUCKET_NAME'), asset.path, this.PRESIGNED_URL_EXPIRY);

    return {
      asset, presignedUrl,
    };
  }
  async uploadFile(file: File, fileName: string, type: FileType, assetName?: string) {
    const url = await this.uploadFileToMinio(file, fileName, type);

    return this.assetRepository.createAsset(url, assetName);
  }
  async uploadFileToMinio(file: File, fileName: string, type: FileType) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const path = type ? `${type}/${fileName}` : fileName;
    const BUCKET_NAME = this.configService.get('MINIO_BUCKET_NAME');

    await this.minioClient.putObject(BUCKET_NAME, path, buffer, file.size);

    return path;
  }
  buildPublicUrl(path: string) {
    return `${this.configService.get('MINIO_PUBLIC_URL')}/${path}`;
  }
}
