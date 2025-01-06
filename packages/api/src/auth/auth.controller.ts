import { Controller, Get, Post, UseGuards, Body, Req } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { AuthService } from './auth.service'
import { GoogleAuthDto } from './dto/google-auth.dto'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { Response } from 'express'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: Response & { user: GoogleAuthDto }) {
    return this.authService.googleLogin(req.user)
  }

  @Post('refresh')
  async refreshAccessToken(@Body('refreshToken') refreshToken: string) {
    return this.authService.refreshAccessToken(refreshToken)
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async me(@Req() req: Response & { user: GoogleAuthDto }) {
    return req.user
  }
}
