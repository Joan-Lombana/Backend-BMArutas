import { Controller, Get, Post, Body } from '@nestjs/common';
import { IncidenciaService } from './incidencia.service';

@Controller('operativo/incidencias')
export class IncidenciaController {
  constructor(private readonly incidenciaService: IncidenciaService) {}

  @Post()
  async create(@Body() body: any) {
    return await this.incidenciaService.create(body);
  }

  @Get()
  async findAll() {
    return await this.incidenciaService.findAll();
  }
}
