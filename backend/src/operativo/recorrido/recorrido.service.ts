import { Injectable, NotFoundException } from '@nestjs/common';
import { OperativoService } from '../operativo.service';
import { CreateRecorridoDto } from './dto/create-recorrido.dto';
import { Recorrido, EstadoRecorrido } from './entities/recorrido.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RecorridoService {
  constructor(
    private readonly operativoService: OperativoService,
    @InjectRepository(Recorrido)
    private readonly recorridoRepo: Repository<Recorrido>,
  ) {}

    async crear(dto: CreateRecorridoDto) {
    /*
      try {
      const apiResponse = await this.operativoService.crearRecorrido({
        ruta_id: dto.ruta_id,
        vehiculo_id: dto.vehiculo_id,
      });
    } catch (e) {
      console.error('ERROR microservicio operativo:', e);
      throw new Error('Error llamando servicio operativo');
    }*/

    const recorrido = this.recorridoRepo.create({
      ruta_id: dto.ruta_id,
      vehiculo_id: dto.vehiculo_id,
      conductor_id: dto.conductor_id,
      estado: EstadoRecorrido.PROGRAMADA,
    });

    return await this.recorridoRepo.save(recorrido);
  }

  async obtenerTodos() {
    return this.recorridoRepo.find();
  }

  async obtenerPorId(id: string) {
    const recorrido = await this.recorridoRepo.findOne({ where: { id } });

    if (!recorrido) {
      throw new NotFoundException('Recorrido no encontrado');
    }

    return recorrido;
  }

  async iniciar(id: string) {
    const recorrido = await this.obtenerPorId(id);
    recorrido.estado = EstadoRecorrido.ACTIVA;
    return this.recorridoRepo.save(recorrido);
  }

  async pausar(id: string) {
    const recorrido = await this.obtenerPorId(id);
    recorrido.estado = EstadoRecorrido.PAUSADO;
    return this.recorridoRepo.save(recorrido);
  }

  async finalizar(id: string) {
    const recorrido = await this.obtenerPorId(id);
    recorrido.estado = EstadoRecorrido.FINALIZADO;
    return this.recorridoRepo.save(recorrido);
  }
}