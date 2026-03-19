import {
  Controller,
  Get,
  Req,
  Post,
  Body,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

import type { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // ==========================
  // LOGIN
  // ==========================
  @Post('login')
  async login(@Body() body: { correo: string; password: string }) {
    return this.authService.loginLocal(body.correo, body.password);
  }

  // ==========================
  // PROFILE (PROTEGIDO)
  // ==========================
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Req() req) {
    console.log('Token payload:', req.user); // req.user ya tiene sub, correo, rol
    const usuario = await this.authService.validateUser(req.user.sub);
    return usuario;
  }
}



