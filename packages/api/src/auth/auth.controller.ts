import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';
import { Member } from '@tapie-kr/api-database';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { GoogleAuthDto } from './dto/google-auth.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
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
    })  {
    // 구글 로그인 Oauth Callback 처리
    return this.authService.googleLogin(req.user, service);
  }
  @Post('refresh')
  @ApiBody({ schema: {
    type: 'object', properties: { refreshToken: { type: 'string' } },
  } })
  async refreshAccessToken(@Body('refreshToken') refreshToken: string) {
    // 토큰 Refresh 하기
    return this.authService.refreshAccessToken(refreshToken);
  }
  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('accessToken')
  async me(@Req() req: Response & {
    user: Member;
  }) {
    return req.user;
  }
}
