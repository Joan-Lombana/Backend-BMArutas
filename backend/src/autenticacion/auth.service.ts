// auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './usuario/entities/usuario.entity';
import { Perfil } from './perfil/entities/perfil.entity';
import { Rol, TipoRol } from './rol/entities/rol.entity';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario) private usuariosRepo: Repository<Usuario>,
    @InjectRepository(Perfil) private perfilesRepo: Repository<Perfil>,
    @InjectRepository(Rol) private rolesRepo: Repository<Rol>,
    private jwtService: JwtService,
  ) {}


  async loginWithGoogle(profile: any) {
    let usuario = await this.usuariosRepo.findOne({
      where: { correo: profile.email },
      relations: ['perfil', 'perfil.rol'],
    });

    if (!usuario) {
      const totalUsuarios = await this.usuariosRepo.count();
      const rolAdmin = await this.rolesRepo.findOne({ where: { tipo: TipoRol.ADMIN } });
      const rolUsuario = await this.rolesRepo.findOne({ where: { tipo: TipoRol.USUARIO } });

      const rolSeleccionado = totalUsuarios < 3 ? rolAdmin : rolUsuario;

      usuario = this.usuariosRepo.create({
        nombre: profile.nombre,
        apellido: profile.apellido,
        correo: profile.email,
        foto: profile.foto,
        activo: true,
      });
      await this.usuariosRepo.save(usuario);

      const perfil = this.perfilesRepo.create({
        estado: 'activo',
        personalizacion: {},
        usuario,
        rol: rolSeleccionado,
      });
      await this.perfilesRepo.save(perfil);

      usuario.perfil = perfil;
      await this.usuariosRepo.save(usuario);
    }

    if (!usuario.perfil || !usuario.perfil.rol) {
      throw new Error('El usuario no tiene un perfil o rol asignado');
    }
    console.log("➡ usuario cargado desde DB:", usuario);
    console.log("➡ nombre:", usuario.nombre);
    console.log("➡ apellido:", usuario.apellido);

    const payload = {
      sub: usuario.id,
      correo: usuario.correo,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      foto: usuario.foto,
      rol: usuario.perfil.rol.tipo,

    };

    const token = this.jwtService.sign(payload);

    return { access_token: token, usuario };
  }
}



