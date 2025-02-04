import { Controller, Get, Post, UseGuards, Body, Req, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { GoogleAuthDto } from './dto/google-auth.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // 구글 로그인 Oauth URL로 Redirect
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: Response & { user: GoogleAuthDto }) {
    // 구글 로그인 Oauth Callback 처리
    return this.authService.googleLogin(req.user);
  }

  @Post('refresh')
  async refreshAccessToken(@Body('refreshToken') refreshToken: string) {
    // 토큰 Refresh 하기
    return this.authService.refreshAccessToken(refreshToken);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async me(@Req() req: Response & { user: GoogleAuthDto }) {
    // 내 정보 보기 (Member 모델)
    return req.user;
  }
}
