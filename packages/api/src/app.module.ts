import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AssetModule } from '@/asset/asset.module';
import { AuthModule } from '@/auth/auth.module';
import { FormModule } from '@/form/form.module';
import { MembersModule } from '@/members/members.module';

@Module({ imports: [
  ConfigModule.forRoot({
    isGlobal:    true,
    envFilePath: ['.env', '.env.development'],
  }),
  CacheModule.register({ isGlobal: true }),
  AuthModule,

  // Members
  MembersModule,

  // Form
  FormModule,

  // Minio (S3)
  AssetModule,
] })
export class AppModule {
}
