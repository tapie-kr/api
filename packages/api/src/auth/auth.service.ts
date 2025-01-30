import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { GoogleAuthDto } from './dto/google-auth.dto';
import { MemberPayloadDto } from './dto/member-payload.dto';
import { MembersService } from 'src/members/members.service';
import { omit } from 'src/common/utils/object';
import { GetMemberMethod } from 'src/members/enums/member.enum';
import { JWT_CONSTANTS } from 'src/common/constants/auth/jwt.constants'
import AUTH_ERROR_MESSAGE from 'src/common/constants/error/auth-message.constants'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly membersService: MembersService,
  ) {}

  async googleLogin(googleUser: GoogleAuthDto) {
    if (!googleUser) {
      throw new UnauthorizedException(AUTH_ERROR_MESSAGE.ACCOUNT.INVALID);
    }
    const existsMember = await this.membersService.getMember(
      GetMemberMethod.GOOGLE_EMAIL,
      googleUser.email,
    );
    if (!existsMember) {
      throw new UnauthorizedException(AUTH_ERROR_MESSAGE.ACCOUNT.NOT_FOUND);
    }

    const payload: MemberPayloadDto = existsMember;
    const jwtSecret = this.configService.get('JWT_SECRET');
    const refreshSecret = this.configService.get('JWT_REFRESH_SECRET');

    const accessToken = this.jwtService.sign(payload, {
      secret: jwtSecret,
      expiresIn: JWT_CONSTANTS.ACCESS_TOKEN_EXPIRES_IN,
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: refreshSecret,
      expiresIn: JWT_CONSTANTS.REFRESH_TOKEN_EXPIRES_IN,
    });

    return { accessToken, refreshToken };
  }

  async validateToken(token: string) {
    try {
      const jwtSecret = this.configService.get('JWT_SECRET');
      return this.jwtService.verifyAsync<MemberPayloadDto>(token, {
        secret: jwtSecret,
      });
    } catch (error) {
      throw new UnauthorizedException(AUTH_ERROR_MESSAGE.TOKEN.INVALID_REFRESH);
    }
  }

  async refreshAccessToken(refreshToken: string) {
    try {
      const refreshSecret = this.configService.get('JWT_REFRESH_SECRET');
      const verifiedPayload = await this.jwtService.verifyAsync<MemberPayloadDto>(refreshToken, {
        secret: refreshSecret,
      });

      const payload = omit<MemberPayloadDto>(verifiedPayload, ['iat', 'exp']);

      const jwtSecret = this.configService.get('JWT_SECRET');
      const accessToken = this.jwtService.sign(payload, {
        secret: jwtSecret,
        expiresIn: '2h',
      });

      return { accessToken };
    } catch (error) {
      throw new UnauthorizedException(AUTH_ERROR_MESSAGE.TOKEN.INVALID, error);
    }
  }
}
