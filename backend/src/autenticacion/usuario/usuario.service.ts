import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

import { Usuario } from './entities/usuario.entity';
import { Perfil } from '../perfil/entities/perfil.entity';
import { Rol, TipoRol } from '../rol/entities/rol.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepo: Repository<Usuario>,

    @InjectRepository(Perfil)
    private perfilesRepo: Repository<Perfil>,

    @InjectRepository(Rol)
    private rolesRepo: Repository<Rol>,
  ) {}

  // =========================
  // CREAR USUARIO (solo admin -> conductor)
  // =========================
  async create(dto: CreateUsuarioDto) {
    // Validar que el rol sea conductor
    if (dto.rol !== TipoRol.CONDUCTOR) {
      throw new UnauthorizedException(
        'Solo se pueden crear usuarios con rol conductor',
      );
    }
    
    // Verificar que no exista correo duplicado
    const exist = await this.usuariosRepo.findOne({ where: { correo: dto.correo } });
    if (exist) {
      throw new UnauthorizedException('Ya existe un usuario con este correo');
    }

    // Crear usuario
    const usuario = this.usuariosRepo.create({
      primerNombre: dto.primerNombre,
      primerApellido: dto.primerApellido,
      segundoApellido: dto.segundoApellido,
      correo: dto.correo,
      password: await bcrypt.hash(dto.password, 10),
      activo: true,
    });
    await this.usuariosRepo.save(usuario);

    // Obtener rol conductor
    const rol = await this.rolesRepo.findOne({ where: { tipo: dto.rol } });
    if (!rol) {
      throw new UnauthorizedException('Rol conductor no existe');
    }

    // Crear perfil
    const perfil = this.perfilesRepo.create({
      usuario,
      rol,
      estado: 'activo',
      personalizacion: {},
    });
    await this.perfilesRepo.save(perfil);

    return usuario;
  }

  // =========================
  // LISTAR TODOS LOS USUARIOS
  // =========================
  findAll() {
    return this.usuariosRepo.find({ relations: ['perfil', 'perfil.rol'] });
  }

  // =========================
  // OBTENER UN USUARIO
  // =========================
  async findOne(id: string) {
    const usuario = await this.usuariosRepo.findOne({
      where: { id },
      relations: ['perfil', 'perfil.rol'],
    });
    if (!usuario) throw new NotFoundException('Usuario no encontrado');
    return usuario;
  }

  // =========================
  // ACTUALIZAR USUARIO (solo campos no sensibles)
  // =========================
  async update(id: string, data: UpdateUsuarioDto) {
    const usuario = await this.findOne(id);

    // Evitar actualizar password desde aquí
    if (data.password) delete data.password;

    Object.assign(usuario, data);
    return this.usuariosRepo.save(usuario);
  }

  // =========================
  // ELIMINAR USUARIO
  // =========================
  async remove(id: string) {
    const usuario = await this.findOne(id);
    return this.usuariosRepo.remove(usuario);
  }
}


