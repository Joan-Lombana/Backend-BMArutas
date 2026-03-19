import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'secretKey', // tu secreto
    });
  }

  async validate(payload: any) {
    // Esto será req.user
    return {
      sub: payload.sub,
      correo: payload.correo,
      primerNombre: payload.primerNombre,
      segundoNombre: payload.segundoNombre,
      primerApellido: payload.primerApellido,
      segundoApellido: payload.segundoApellido,
      rol: payload.rol,
    };
  }
}