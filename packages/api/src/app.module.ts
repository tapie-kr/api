import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@/auth/auth.module';
import { FormModule } from '@/form/form.module';
import { MembersModule } from '@/members/module/members.module';
import { ProfileLinkModule } from '@/members/module/profile-link.module';
import { MinioModule } from '@/minio/minio.module';

@Module({ imports: [
  ConfigModule.forRoot({
    isGlobal:    true,
    envFilePath: ['.env', '.env.development'],
  }),
  CacheModule.register({ isGlobal: true }),
  AuthModule,

  // Members
  MembersModule,

  ProfileLinkModule,

  // Form
  FormModule,

  // Minio (S3)
  MinioModule,
] })
export class AppModule {
}
