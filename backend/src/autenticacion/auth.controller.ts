// auth.controller.ts
import { Controller, Get, Req, Res, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import type { Request, Response } from 'express';

@Controller('auth')
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
    const { access_token, usuario } = await this.authService.loginWithGoogle(req.user);

    // Enviar token en el body, no en cookie
    res.redirect(`${process.env.FRONTEND_URL}/auth-callback?token=${access_token}`);
  }



  // Endpoint protegido (lector del usuario autenticado)
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req: Request) {
    return req.user; // Devuelve usuario autenticado
  }

  // Logout
  @Post('logout')
  logout() {
    return { msg: 'Logout exitoso' };
  }
}



