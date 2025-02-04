import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { AuthModule } from './auth/auth.module';
import { MembersModule } from './members/module/members.module';
import { FormModule } from './form/form.module';
import { ProfileLinkModule } from './members/module/profile-link.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.development'],
    }),
    CacheModule.register({ isGlobal: true }),
    AuthModule,

    // Members
    MembersModule,
    ProfileLinkModule,

    // Form
    FormModule,
  ],
})
export class AppModule {}
