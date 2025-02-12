import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { MemberRole, MemberUnit } from '@tapie-kr/api-database';
import { map } from 'rxjs/operators';
import { GoogleAuthDto } from '@/auth/dto/google-auth.dto';
import { MemberPayloadDto } from '@/auth/dto/member-payload.dto';
import { JWT_CONSTANTS } from '@/common/constants/auth/jwt.constants';
import AUTH_ERROR_MESSAGE from '@/common/constants/error/auth-message.constants';
import { omit } from '@/common/utils/object';
import { GetMemberMethod } from '@/members/enums/member.enum';
import { MembersService } from '@/members/service/members.service';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly membersService: MembersService,
    private readonly httpService: HttpService) {
  }
  async googleLogin(googleUser: GoogleAuthDto, service: string) {
    if (!googleUser) {
      throw new UnauthorizedException(AUTH_ERROR_MESSAGE.ACCOUNT.INVALID);
    }

    const existsMember = await this.membersService.getMember(GetMemberMethod.GOOGLE_EMAIL,
      googleUser.email);

    if (!existsMember && service === 'website') {
      throw new UnauthorizedException(AUTH_ERROR_MESSAGE.ACCOUNT.NOT_FOUND);
    }

    let payload: MemberPayloadDto;

    if (!existsMember && service == 'form') {
      const newMember = await new Promise(async (resolve, reject) => {
        this.httpService
          .get<GoogleProfile>('/userinfo/v2/me', { headers: { Authorization: `Bearer ${googleUser.accessToken}` } })
          .pipe(map(response => response.data))
          .subscribe({
            next: async data => {
              const member = await this.membersService.createMember({
                googleEmail: data.email,
                name:        data.name,
                role:        MemberRole.GUEST,
                unit:        MemberUnit.EXTERNAL,
              });

              resolve(member);
            },
            error: _error => {
              reject(new InternalServerErrorException('구글로 회원가입하던 중 오류가 발생했습니다.'));
            },
          });
      });

      payload = newMember as MemberPayloadDto;
    } else {
      payload = existsMember;
    }

    const jwtSecret = this.configService.get('JWT_SECRET');
    const refreshSecret = this.configService.get('JWT_REFRESH_SECRET');

    const accessToken = this.jwtService.sign(payload, {
      secret:    jwtSecret,
      expiresIn: JWT_CONSTANTS.ACCESS_TOKEN_EXPIRES_IN,
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret:    refreshSecret,
      expiresIn: JWT_CONSTANTS.REFRESH_TOKEN_EXPIRES_IN,
    });

    return {
      accessToken, refreshToken,
    };
  }
  async validateToken(token: string) {
    try {
      const jwtSecret = this.configService.get('JWT_SECRET');

      return this.jwtService.verifyAsync<MemberPayloadDto>(token, { secret: jwtSecret });
    } catch (_error) {
      throw new UnauthorizedException(AUTH_ERROR_MESSAGE.TOKEN.INVALID_REFRESH);
    }
  }
  async refreshAccessToken(refreshToken: string) {
    try {
      const refreshSecret = this.configService.get('JWT_REFRESH_SECRET');
      const verifiedPayload = await this.jwtService.verifyAsync<MemberPayloadDto>(refreshToken, { secret: refreshSecret });
      const payload = omit<MemberPayloadDto>(verifiedPayload, ['iat', 'exp']);
      const jwtSecret = this.configService.get('JWT_SECRET');

      const accessToken = this.jwtService.sign(payload, {
        secret:    jwtSecret,
        expiresIn: '2h',
      });

      return { accessToken };
    } catch (error) {
      throw new UnauthorizedException(AUTH_ERROR_MESSAGE.TOKEN.INVALID, error);
    }
  }
}

interface GoogleProfile {
  family_name:    string;
  name:           string;
  picture:        string;
  email:          string;
  given_name:     string;
  id:             string;
  verified_email: boolean;
}
