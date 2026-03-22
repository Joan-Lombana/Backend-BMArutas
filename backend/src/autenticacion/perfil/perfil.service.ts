import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Perfil } from './entities/perfil.entity';
import { Usuario } from '../usuario/entities/usuario.entity';
import { Rol } from '../rol/entities/rol.entity';

import { CreatePerfilDto } from './dto/create-perfil.dto';
import { UpdatePerfilDto } from './dto/update-perfil.dto';

@Injectable()
export class PerfilService {
  constructor(
    @InjectRepository(Perfil)
    private perfilRepo: Repository<Perfil>,

    @InjectRepository(Usuario)
    private usuarioRepo: Repository<Usuario>,

    @InjectRepository(Rol)
    private rolRepo: Repository<Rol>,
  ) {}

  // =========================
  // CREAR PERFIL
  // =========================
  async create(dto: CreatePerfilDto) {

    const usuario = await this.usuarioRepo.findOne({
      where: { id: dto.usuarioId },
    });

    if (!usuario) {
      throw new NotFoundException('Usuario no existe');
    }

    let rol: Rol | null = null;

    if (dto.rolId) {
      rol = await this.rolRepo.findOne({
        where: { id: dto.rolId },
      });

      if (!rol) {
        throw new NotFoundException('Rol no existe');
      }
    }

    const perfil = this.perfilRepo.create({
      estado: dto.estado ?? 'activo',
      personalizacion: dto.personalizacion ?? {},
      usuario,
      rol,
    });

    return this.perfilRepo.save(perfil);
  }

  // =========================
  // LISTAR
  // =========================
  async findAll() {
    return this.perfilRepo.find({
      relations: ['usuario', 'rol'],
    });
  }

  // =========================
  // OBTENER UNO
  // =========================
  async findOne(id: string) {
    const perfil = await this.perfilRepo.findOne({
      where: { id },
      relations: ['usuario', 'rol'],
    });

    if (!perfil) {
      throw new NotFoundException('Perfil no encontrado');
    }

    return perfil;
  }

  // =========================
  // ACTUALIZAR
  // =========================
  async update(id: string, dto: UpdatePerfilDto) {
    const perfil = await this.findOne(id);

    if (dto.rolId) {
      const rol = await this.rolRepo.findOne({
        where: { id: dto.rolId },
      });

      if (!rol) {
        throw new NotFoundException('Rol no existe');
      }

      perfil.rol = rol;
    }

    if (dto.estado) {
      perfil.estado = dto.estado;
    }

    if (dto.personalizacion) {
      perfil.personalizacion = dto.personalizacion;
    }

    return this.perfilRepo.save(perfil);
  }

  // =========================
  // ELIMINAR
  // =========================
  async remove(id: string) {
    const perfil = await this.findOne(id);
    return this.perfilRepo.remove(perfil);
  }
}
