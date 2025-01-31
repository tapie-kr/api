import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { AuthModule } from './auth/auth.module';
import { MembersModule } from './members/module/members.module';
import { HealthModule } from './health/health.module';
import { FormModule } from './form/form.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.development'],
    }),
    CacheModule.register({ isGlobal: true }),
    AuthModule,
    MembersModule,
    HealthModule,
    FormModule,
  ],
})
export class AppModule {}
