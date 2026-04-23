import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RecorridoService } from './recorrido.service';
import { CreateRecorridoDto } from './dto/create-recorrido.dto';

import { RolesGuard } from 'src/autenticacion/guards/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/autenticacion/decoradores/roles.decorador';

@Controller('operativo/recorridos')
export class RecorridoController {
  constructor(private readonly recorridoService: RecorridoService) {}

  // 🔥 Crear recorrido
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Post('/crear')
  crear(@Body() dto: CreateRecorridoDto) {
    return this.recorridoService.crear(dto);
  }

  @Get('/local')
  obtenerRecorridos() {
    return this.recorridoService.obtenerTodos();
  }

  // 🔍 Obtener uno
  @Get(':id')
  obtenerPorId(@Param('id') id: string) {
    return this.recorridoService.obtenerPorId(id);
  }

  // ▶️ Iniciar recorrido
  @Patch(':id/iniciar')
  iniciar(@Param('id') id: string) {
    return this.recorridoService.iniciar(id);
  }

  // ⏸️ Pausar
  @Patch(':id/pausar')
  pausar(@Param('id') id: string) {
    return this.recorridoService.pausar(id);
  }

  // ⏹️ Finalizar
  @Patch(':id/finalizar')
  finalizar(@Param('id') id: string) {
    return this.recorridoService.finalizar(id);
  }

  // 🗑️ Eliminar
  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.recorridoService.eliminar(id);
  }
}