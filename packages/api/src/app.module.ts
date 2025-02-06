import { AuthModule } from '@api/auth/auth.module';
import { FormModule } from '@api/form/form.module';
import { MembersModule } from '@api/members/module/members.module';
import { ProfileLinkModule } from '@api/members/module/profile-link.module';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

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
] })
export class AppModule {
}
