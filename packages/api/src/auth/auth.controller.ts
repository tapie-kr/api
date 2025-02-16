import {
  BadRequestException,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOperation,
  getSchemaPath,
} from '@nestjs/swagger';
import { Request, Response } from 'express';
import { MemberPayloadDto, MemberPayloadWithoutTypeDto } from '@/auth/dto/member-payload.dto';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { ApiCommonResponse } from '@/common/utils/swagger';
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
  @ApiOperation({
    summary: 'Google Oauth Code로 서비스에 로그인', description: 'accessToken과 refreshToken은 쿠키로 관리됩니다',
  })
  @ApiCommonResponse(HttpStatus.OK, { $ref: getSchemaPath(MemberPayloadWithoutTypeDto) })
  @ApiExtraModels(MemberPayloadWithoutTypeDto)
  async googleAuthRedirect(@Query('service') service: string,
    @Query('code') _code: string,
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
  @ApiCommonResponse(HttpStatus.OK, {
    type: 'string', example: 'ok',
  })
  @ApiOperation({
    summary: 'Access Token을 Refresh하기', description: '*쿠키에 refreshToken을 설정해야 합니다.',
  })
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
  @ApiCommonResponse(HttpStatus.OK, { $ref: getSchemaPath(MemberPayloadWithoutTypeDto) })
  @ApiOperation({ summary: '내 정보 가져오기' })
  async me(@Req() req: Response & {
    user: MemberPayloadDto;
  }) {
    return {
      id:    req.user.id,
      email: req.user.email,
      name:  req.user.name,
    } as MemberPayloadWithoutTypeDto;
  }
}
