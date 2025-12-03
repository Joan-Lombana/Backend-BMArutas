import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { OperativoService } from './operativo.service';

@Controller('operativo')
export class OperativoController {
  constructor(private readonly operativoService: OperativoService) {}

  // === VEHÍCULOS ===
  @Get('vehiculos')
  obtenerVehiculos(@Query('perfil_id') perfil_id: string) {
    return this.operativoService.obtenerVehiculosPorPerfil(perfil_id);
  }

  @Post('vehiculos/crear')
  crearVehiculo(@Body() body: any) {
    console.log('📥 Body recibido en OperativoController:', body);
    return this.operativoService.crearVehiculo(body);
  }

  @Get('vehiculos/:id')
  obtenerVehiculoPorId(@Param('id') id: string) {
    return this.operativoService.obtenerVehiculoPorId(id);
  }

  @Put('vehiculos/:id')
  actualizarVehiculo(@Param('id') id: string, @Body() body: any) {
    return this.operativoService.actualizarVehiculo(id, body);
  }

  @Delete('vehiculos/:id')
  eliminarVehiculo(@Param('id') id: string) {
    return this.operativoService.eliminarVehiculo(id);
  }

  // === RUTAS ===
  @Get('rutas')
  obtenerRutas(@Query('perfil_id') perfil_id: string) {
    return this.operativoService.obtenerRutasPorPerfil(perfil_id);
  }

  @Post('rutas')
  crearRuta(@Body() body: any) {
    return this.operativoService.crearRuta(body);
  }

  @Get('rutas/:id')
  obtenerRutaPorId(@Param('id') id: string) {
    return this.operativoService.obtenerRutaPorId(id);
  }

  @Put('rutas/:id')
  actualizarRuta(@Param('id') id: string, @Body() body: any) {
    return this.operativoService.actualizarRuta(id, body);
  }

  @Delete('rutas/:id')
  eliminarRuta(@Param('id') id: string) {
    return this.operativoService.eliminarRuta(id);
  }

  // === HORARIOS ===
  @Get('horarios')
  obtenerHorarios(@Query('perfil_id') perfil_id: string) {
    return this.operativoService.obtenerHorariosPorPerfil(perfil_id);
  }

  @Post('horarios')
  crearHorario(@Body() body: any) {
    return this.operativoService.crearHorario(body);
  }

  @Get('horarios/:id')
  obtenerHorarioPorId(@Param('id') id: string) {
    return this.operativoService.obtenerHorarioPorId(id);
  }

  @Put('horarios/:id')
  actualizarHorario(@Param('id') id: string, @Body() body: any) {
    return this.operativoService.actualizarHorario(id, body);
  }

  @Delete('horarios/:id')
  eliminarHorario(@Param('id') id: string) {
    return this.operativoService.eliminarHorario(id);
  }

  // === RECORRIDOS ===
  @Get('recorridos')
  obtenerRecorridos(@Query('perfil_id') perfil_id: string) {
    return this.operativoService.obtenerRecorridosPorPerfil(perfil_id);
  }

  @Post('recorridos')
  crearRecorrido(@Body() body: any) {
    return this.operativoService.crearRecorrido(body);
  }

  @Get('recorridos/:id')
  obtenerRecorridoPorId(@Param('id') id: string) {
    return this.operativoService.obtenerRecorridoPorId(id);
  }

  @Put('recorridos/:id')
  actualizarRecorrido(@Param('id') id: string, @Body() body: any) {
    return this.operativoService.actualizarRecorrido(id, body);
  }

  @Delete('recorridos/:id')
  eliminarRecorrido(@Param('id') id: string) {
    return this.operativoService.eliminarRecorrido(id);
  }

  // === POSICIONES ===
  @Get('recorridos/:id/posiciones')
  obtenerPosiciones(@Param('id') recorridoId: string) {
    return this.operativoService.obtenerPosiciones(recorridoId);
  }

  @Post('recorridos/:id/posiciones')
  crearPosicion(@Param('id') recorridoId: string, @Body() body: any) {
    return this.operativoService.crearPosicion(recorridoId, body);
  }

  @Get('recorridos/:id/posiciones/:posicionId')
  obtenerPosicionPorId(@Param('id') recorridoId: string, @Param('posicionId') posicionId: string) {
    return this.operativoService.obtenerPosicionPorId(recorridoId, posicionId);
  }

  @Put('recorridos/:id/posiciones/:posicionId')
  actualizarPosicion(@Param('id') recorridoId: string, @Param('posicionId') posicionId: string, @Body() body: any) {
    return this.operativoService.actualizarPosicion(recorridoId, posicionId, body);
  }

  @Delete('recorridos/:id/posiciones/:posicionId')
  eliminarPosicion(@Param('id') recorridoId: string, @Param('posicionId') posicionId: string) {
    return this.operativoService.eliminarPosicion(recorridoId, posicionId);
  }

  // === CALLES ===
  @Get('calles')
  obtenerCalles() {
    return this.operativoService.obtenerCalles();
  }

  @Post('calles')
  crearCalle(@Body() body: any) {
    return this.operativoService.crearCalle(body);
  }

  @Get('calles/:id')
  obtenerCallePorId(@Param('id') id: string) {
    return this.operativoService.obtenerCallePorId(id);
  }

  @Put('calles/:id')
  actualizarCalle(@Param('id') id: string, @Body() body: any) {
    return this.operativoService.actualizarCalle(id, body);
  }

  @Delete('calles/:id')
  eliminarCalle(@Param('id') id: string) {
    return this.operativoService.eliminarCalle(id);
  }
}





