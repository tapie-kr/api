import {
  BadRequestException,
  Controller,
  Get,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { MemberPayloadDto } from '@/auth/dto/member-payload.dto';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { AuthService } from './auth.service';
import { GoogleAuthDto } from './dto/google-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
    private readonly configService: ConfigService) {
  }
  @Get('google')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Google Oauth 로그인으로 Redirect' })
  async googleAuth() {
  }
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Query('service') service: string,
    @Req() req: Response & {
      user: GoogleAuthDto;
    },
    @Res({ passthrough: true }) res: Response)  {
    const { tokens, user } = await this.authService.googleLogin(req.user, service);

    res.cookie('accessToken', tokens.accessToken, {
      httpOnly: true,
      secure:   this.configService.get('NODE_ENV') === 'production',
      sameSite: 'lax',
    });

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure:   this.configService.get('NODE_ENV') === 'production',
      sameSite: 'lax',
    });

    return {
      id:    user.id,
      email: user.email,
      name:  user.name,
    };
  }
  @Post('refresh')
  @ApiBearerAuth('RefreshToken')
  async refreshAccessToken(@Res({ passthrough: true }) res: Response, @Req() req: Request) {
    // 토큰 Refresh 하기

    if (!req.cookies?.refreshToken) {
      throw new BadRequestException('Refresh Token이 없습니다.');
    }

    const { accessToken } = await this.authService.refreshAccessToken(req.cookies?.refreshToken);

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure:   this.configService.get('NODE_ENV') === 'production',
      sameSite: 'lax',
    });

    return 'ok';
  }
  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('AccessToken')
  async me(@Req() req: Response & {
    user: MemberPayloadDto;
  }) {
    return req.user;
  }
}
