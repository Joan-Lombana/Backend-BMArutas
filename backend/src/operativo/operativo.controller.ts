import { Controller, Get, Param } from '@nestjs/common';
import { OperativoService } from './operativo.service';

@Controller('operativo')
export class OperativoController {
  constructor(private readonly operativoService: OperativoService) {}

  // === RUTAS ===
  @Get('rutas')
  obtenerRutas() {
    return this.operativoService.obtenerRutasDesdeMicroservicio();
  }

  // === CALLES ===
  @Get('calles')
  obtenerCalles() {
    return this.operativoService.obtenerCallesDesdeMicroservicio();
  }

  // === VEHÍCULOS ===
  @Get('vehiculos')
  obtenerVehiculos() {
    return this.operativoService.obtenerVehiculosDesdeMicroservicio();
  }

  // === HORARIOS ===
  @Get('horarios')
  obtenerHorarios() {
    return this.operativoService.obtenerHorariosDesdeMicroservicio();
  }

  // === RECORRIDOS ===
  @Get('recorridos')
  obtenerRecorridos() {
    return this.operativoService.obtenerRecorridosDesdeMicroservicio();
  }

  // === POSICIONES ===
  @Get('recorridos/:id/posiciones')
  obtenerPosiciones(@Param('id') id: number) {
    return this.operativoService.obtenerPosicionesDesdeMicroservicio(id);
  }

}
