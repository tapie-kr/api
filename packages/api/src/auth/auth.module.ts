import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MembersModule } from '@/members/module/members.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './strategies/google.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ session: false }),
    JwtModule.registerAsync({
      imports:    [ConfigModule],
      inject:     [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret:      configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
    }),
    MembersModule,
    HttpModule.registerAsync({ useFactory: () => ({ baseURL: 'https://www.googleapis.com' }) }),
  ],
  controllers: [AuthController],
  providers:   [
    AuthService,
    GoogleStrategy,
    JwtStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {
}
