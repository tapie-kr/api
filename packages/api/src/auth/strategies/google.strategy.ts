import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import {
  type Profile,
  Strategy,
  type StrategyOptions,
  type VerifyCallback,
} from 'passport-google-oauth20';
import { GoogleAuthDto } from '@/auth/dto/google-auth.dto';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID:          configService.get('GOOGLE_CLIENT_ID'),
      clientSecret:      configService.get('GOOGLE_CLIENT_SECRET'),
      callbackURL:       configService.get('GOOGLE_CALLBACK_URL'),
      scope:             ['email', 'profile'],
      passReqToCallback: true,
    });
  }
  authenticate(req: Request, options?: StrategyOptions) {
    const serviceName = req.query.service as string;
    const callbackURLContext = new URL(this.configService.get('GOOGLE_CALLBACK_URL'));

    callbackURLContext.searchParams.append('service', serviceName || 'website');

    const callbackURL = callbackURLContext.toString();

    super.authenticate(req, {
      ...options,
      callbackURL,
    });
  }
  async validate(
    _req: Request,
    accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) {
    const { emails } = profile;
    const user = new GoogleAuthDto;

    user.email = emails[0].value;

    user.accessToken = accessToken;

    done(null, user);
  }
}
