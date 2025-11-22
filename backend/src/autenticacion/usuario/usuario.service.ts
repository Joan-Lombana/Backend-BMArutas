import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepo: Repository<Usuario>,
  ) {}

  findAll() {
    return this.usuariosRepo.find({ relations: ['perfil', 'perfil.rol'] });
  }

  async findOne(id: string) {
    const usuario = await this.usuariosRepo.findOne({
      where: { id },
      relations: ['perfil', 'perfil.rol'],
    });
    if (!usuario) throw new NotFoundException('Usuario no encontrado');
    return usuario;
  }

  // ADMIN puede actualizar campos que no sean contraseña
  async update(id: string, data: Partial<Usuario>) {
    const usuario = await this.findOne(id);
    Object.assign(usuario, data);
    return this.usuariosRepo.save(usuario);
  }

  async remove(id: string) {
    const usuario = await this.findOne(id);
    return this.usuariosRepo.remove(usuario);
  }
}


