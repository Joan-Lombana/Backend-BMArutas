import { Controller, Get, Param } from '@nestjs/common';
import { ApilucioService } from './apilucio.service';

@Controller('apilucio')
export class ApilucioController {
  constructor(private readonly apilucioService: ApilucioService) {}

  // --- RUTAS ---
  @Get('rutas')
  obtenerRutas() {
    return this.apilucioService.obtenerRutas();
  }

  // --- CALLES ---
  @Get('calles')
  obtenerCalles() {
    console.log('📥 Solicitud recibida en /apilucio/calles');
    return this.apilucioService.obtenerCalles();
  }

  // --- VEHÍCULOS ---
  @Get('vehiculos')
  obtenerVehiculos() {
    return this.apilucioService.obtenerVehiculos();
  }

  // --- HORARIOS ---
  @Get('horarios')
  obtenerHorarios() {
    return this.apilucioService.obtenerHorarios();
  }

  // --- RECORRIDOS ---
  @Get('recorridos')
  obtenerRecorridos() {
    return this.apilucioService.obtenerRecorridos();
  }

  // --- POSICIONES ---
  @Get('recorridos/:id/posiciones')
  obtenerPosiciones(@Param('id') id: number) {
    return this.apilucioService.obtenerPosiciones(id);
  }

 
}

