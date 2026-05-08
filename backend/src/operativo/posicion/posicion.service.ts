import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePosicionDto } from './dto/create-posicion.dto';
import { UpdatePosicionDto } from './dto/update-posicion.dto';
import { Posicion } from './entities/posicion.entity';

@Injectable()
export class PosicionService {
  constructor(
    @InjectRepository(Posicion)
    private readonly posicionRepo: Repository<Posicion>,
  ) {}

  async create(createPosicionDto: CreatePosicionDto) {
    const posicion = this.posicionRepo.create(createPosicionDto);
    return this.posicionRepo.save(posicion);
  }

  async obtenerPosiciones() {
    return this.posicionRepo.find();
  }

  async obtenerPosicionesPorRecorrido(recorridoId: string) {
    return this.posicionRepo.find({ where: { recorridoId } });
  }

  async obtenerPosicionPorId(id: string) {
    const posicion = await this.posicionRepo.findOne({ where: { id } });
    if (!posicion) {
      throw new NotFoundException(`Posición ${id} no encontrada`);
    }
    return posicion;
  }

  async update(id: string, updatePosicionDto: UpdatePosicionDto) {
    const posicion = await this.obtenerPosicionPorId(id);
    Object.assign(posicion, updatePosicionDto);
    return this.posicionRepo.save(posicion);
  }

  async remove(id: string) {
    const posicion = await this.obtenerPosicionPorId(id);
    return this.posicionRepo.remove(posicion);
  }
}
