import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Usuario } from './usuario/entities/usuario.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepo: Repository<Usuario>,
    private jwtService: JwtService,
  ) {}

  async loginWithGoogle(profile: any) {
    // Busca usuario existente por email
    let usuario = await this.usuariosRepo.findOne({
      where: { correo: profile.email },
    });

    // Si no existe, lo crea
    if (!usuario) {
      usuario = this.usuariosRepo.create({
        nombre: profile.nombre,
        correo: profile.email,
        foto: profile.foto,
        activo: true,
      });
      await this.usuariosRepo.save(usuario);
    }

    // Genera token JWT
    const payload = { sub: usuario.id, correo: usuario.correo };
    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      usuario,
    };
  }
}
