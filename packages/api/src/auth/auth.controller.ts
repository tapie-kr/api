import {
  Body,
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
import { ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';
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
  @ApiBody({ schema: {
    type: 'object', properties: { refreshToken: { type: 'string' } },
  } })
  async refreshAccessToken(@Body('refreshToken') refreshToken: string,
    @Res({ passthrough: true }) res: Response) {
    // 토큰 Refresh 하기
    const { accessToken } = await this.authService.refreshAccessToken(refreshToken);

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure:   this.configService.get('NODE_ENV') === 'production',
      sameSite: 'lax',
    });
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
