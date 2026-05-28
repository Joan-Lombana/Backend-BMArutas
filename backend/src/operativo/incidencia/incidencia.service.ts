import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Incidencia } from './entities/incidencia.entity';

@Injectable()
export class IncidenciaService {
  constructor(
    @InjectRepository(Incidencia)
    private readonly incidenciaRepository: Repository<Incidencia>,
  ) {}

  async create(data: any): Promise<Incidencia> {
    return await this.incidenciaRepository.save(
      this.incidenciaRepository.create(data as object)
    ) as any;
  }

  async update(id: string, data: any): Promise<Incidencia> {
    await this.incidenciaRepository.update(id, data);
    return (await this.incidenciaRepository.findOne({ where: { id } }))!;
  }

  async remove(id: string): Promise<void> {
    await this.incidenciaRepository.delete(id);
  }

  async findAll(): Promise<Incidencia[]> {
    return await this.incidenciaRepository.find({
      relations: ['recorrido'],
      order: { createdAt: 'DESC' },
    });
  }
}
