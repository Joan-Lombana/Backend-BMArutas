import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApilucioService } from './apilucio.service';
import { VehiculoAPI } from '../interfaces/vehiculo.interface';
import { BadRequestException } from '@nestjs/common';

@Controller('apilucio')
export class ApilucioController {
  constructor(private readonly apilucioService: ApilucioService) {}

  // ================= VEHÍCULOS =================
  @Get('vehiculos')
  async obtenerVehiculosPorPerfil(@Query('perfil_id') perfil_id: string): Promise<VehiculoAPI[]> {
    if (!perfil_id) throw new BadRequestException('Debe enviarse perfil_id');
    return this.apilucioService.obtenerVehiculosPorPerfil(perfil_id);
  }

  @Post('vehiculos/crear')
  async crearVehiculo(@Body() body: { placa: string; perfil_id: string; marca?: string; modelo?: string; activo?: boolean }) {
    return this.apilucioService.crearVehiculo(body);
  }

  // ================= RUTAS =================
  @Get('rutas')
  async obtenerRutasPorPerfil(@Query('perfil_id') perfil_id: string) {
    if (perfil_id) return this.apilucioService.obtenerRutasPorPerfil(perfil_id);
    return this.apilucioService.listarRutas();
  }

  @Post('rutas/crear')
  async crearRuta(@Body() body: { nombre_ruta: string; perfil_id: string; shape?: any; calles_ids?: string[] }) {
    return this.apilucioService.crearRuta(body);
  }

  // ================= RECORRIDOS =================
  @Get('recorridos')
  async obtenerRecorridosPorPerfil(@Query('perfil_id') perfil_id: string) {
    if (perfil_id) return this.apilucioService.obtenerRecorridosPorPerfil(perfil_id);
    return this.apilucioService.listarRecorridos();
  }

  @Post('recorridos/iniciar')
  async iniciarRecorrido(@Body() body: { ruta_id: string; vehiculo_id: string; perfil_id: string }) {
    return this.apilucioService.iniciarRecorrido(body);
  }

  // ================= POSICIONES =================
  @Get('posiciones')
  async listarTodasLasPosiciones() {
    return this.apilucioService.listarPosiciones();
  }

  @Post('recorridos/:id/posiciones')
  async registrarPosicion(@Param('id') recorridoId: string, @Body() body: { lat: number; lon: number; perfil_id: string }) {
    return this.apilucioService.registrarPosicion(recorridoId, body);
  }

  // ================= CALLES =================
  @Get('calles')
  async obtenerCallesPorPerfil(@Query('perfil_id') perfil_id: string) {
    if (perfil_id) return this.apilucioService.obtenerCallesPorPerfil(perfil_id);
    return this.apilucioService.listarCalles();
  }

  // ================= HORARIOS =================
  @Get('horarios')
  async obtenerHorariosPorPerfil(@Query('perfil_id') perfil_id: string) {
    if (perfil_id) return this.apilucioService.obtenerHorariosPorPerfil(perfil_id);
    return this.apilucioService.listarHorarios();
  }
}


