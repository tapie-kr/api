import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
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
  async googleAuthRedirect(@Req() req: Response & {
    user: GoogleAuthDto;
  }) {
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
  @ApiBearerAuth('accessToken')
  async me(@Req() req: Response & {
    user: GoogleAuthDto;
  }) {
    return req.user;
  }
}
