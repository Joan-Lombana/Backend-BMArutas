import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
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

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return await this.incidenciaService.update(id, body);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.incidenciaService.remove(id);
    return { message: 'Incidencia eliminada correctamente' };
  }
}
