// auth.controller.ts
import { Controller, Get, Req, Res, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import type { Request, Response } from 'express';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Paso 1: Redirige a Google
  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  loginWithGoogle() {
    // Passport se encarga de redirigir a Google automáticamente
  }

  // Paso 2: Callback seguro → genera cookie y redirige al frontend
  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  async googleRedirect(@Req() req: Request, @Res() res: Response) {
    const { access_token } = await this.authService.loginWithGoogle(req.user);

    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    res.redirect(`${process.env.FRONTEND_URL}/principal`);

  }


  // Endpoint protegido (lector del usuario autenticado)
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req: Request) {
    return req.user; // Devuelve usuario autenticado
  }

  // Logout
  @Post('logout')
  logout(@Res() res: Response) {
    res.clearCookie('access_token');
    return res.send({ msg: 'Logout exitoso' });
  }
}



