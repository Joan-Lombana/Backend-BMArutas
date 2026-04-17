import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

import { Usuario } from './usuario/entities/usuario.entity';
import { Perfil } from './perfil/entities/perfil.entity';
import { Rol } from './rol/entities/rol.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepo: Repository<Usuario>,

    @InjectRepository(Perfil)
    private perfilesRepo: Repository<Perfil>,

    @InjectRepository(Rol)
    private rolesRepo: Repository<Rol>,

    private jwtService: JwtService,
  ) {}

  // ==========================
  // 🔥 MAPPER USUARIO (CLAVE)
  // ==========================
  private mapUsuario(usuario: Usuario) {
    return {
      id: usuario.id,
      correo: usuario.correo,
      rol: usuario.perfil?.rol?.tipo,

      // 🔥 datos de nombre
      primerNombre: usuario.primerNombre,
      segundoNombre: usuario.segundoNombre,
      primerApellido: usuario.primerApellido,
      segundoApellido: usuario.segundoApellido,

      nombreCompleto: `${usuario.primerNombre ?? ''} ${usuario.primerApellido ?? ''}`.trim(),
    };
  }

  // ==========================
  // LOGIN LOCAL
  // ==========================
  async loginLocal(correo: string, password: string) {
    console.log('====================');
    console.log('LOGIN INTENTO');
    console.log('correo:', correo);

    const usuario = await this.usuariosRepo
      .createQueryBuilder('usuario')
      .leftJoinAndSelect('usuario.perfil', 'perfil')
      .leftJoinAndSelect('perfil.rol', 'rol')
      .addSelect('usuario.password')
      .where('usuario.correo = :correo', { correo })
      .getOne();

    console.log('usuario encontrado:', usuario);

    if (!usuario) {
      console.log('❌ usuario no existe');
      throw new UnauthorizedException('Usuario no registrado en el sistema');
    }

    if (!usuario.password) {
      console.log('❌ usuario sin password');
      throw new UnauthorizedException('Usuario sin contraseña');
    }

    const valid = await bcrypt.compare(password, usuario.password);
    console.log('password valido:', valid);

    if (!valid) {
      console.log('❌ password incorrecto');
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    if (!usuario.perfil) {
      console.log('❌ no tiene perfil');
      throw new UnauthorizedException('Usuario sin perfil');
    }

    if (!usuario.perfil.rol) {
      console.log('❌ no tiene rol');
      throw new UnauthorizedException('Usuario sin rol');
    }

    // 🔐 JWT SOLO DATOS MÍNIMOS
    const payload = {
      sub: usuario.id,
      correo: usuario.correo,
      rol: usuario.perfil.rol.tipo,
    };

    const token = this.jwtService.sign(payload);

    console.log('✅ LOGIN OK');
    console.log('====================');

    return {
      access_token: token,
      usuario: this.mapUsuario(usuario), // 🔥 CLAVE
    };
  }

  // ==========================
  // VALIDAR TOKEN (DB REAL)
  // ==========================
  async validateUser(id: string) {
    const usuario = await this.usuariosRepo.findOne({
      where: { id },
      relations: ['perfil', 'perfil.rol'],
    });

    console.log('Validando usuario desde DB:', usuario);

    if (!usuario) {
      throw new UnauthorizedException('Usuario no válido');
    }

    return usuario;
  }
}



