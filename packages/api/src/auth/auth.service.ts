import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { GoogleAuthDto } from './dto/google-auth.dto';
import { MemberPayloadDto } from './dto/member-payload.dto';
import { MembersService } from 'src/members/members.service';
import { omit } from 'src/common/utils/object';
import { GetMemberMethod } from 'src/members/enums/member.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly membersService: MembersService,
  ) {}

  async googleLogin(googleUser: GoogleAuthDto) {
    if (!googleUser) {
      throw new UnauthorizedException('잘못된 인증 정보입니다.');
    }
    const existsMember = await this.membersService.getMember(
      GetMemberMethod.GOOGLE_EMAIL,
      googleUser.email,
    );
    if (!existsMember) {
      throw new UnauthorizedException('계정이 없습니다.');
    }

    const payload: MemberPayloadDto = existsMember;
    const jwtSecret = this.configService.get('JWT_SECRET');
    const refreshSecret = this.configService.get('JWT_REFRESH_SECRET');

    const accessToken = this.jwtService.sign(payload, {
      secret: jwtSecret,
      expiresIn: '2h',
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: refreshSecret,
      expiresIn: '7d',
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
      throw new UnauthorizedException('잘못된 토큰입니다.');
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
      throw new UnauthorizedException('잘못된 리프레시 토큰입니다.', error);
    }
  }
}
