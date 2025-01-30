import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { AuthModule } from './auth/auth.module';
import { MembersModule } from './members/members.module';
import { HealthModule } from './health/health.module'

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
  ],
})
export class AppModule {}
