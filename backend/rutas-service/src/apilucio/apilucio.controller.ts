import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApilucioService } from './apilucio.service';

@Controller('apilucio')
export class ApilucioController {
  constructor(private readonly apilucioService: ApilucioService) {}

  // === VEHÍCULOS ===
  @Post('vehiculos')
  obtenerVehiculosPorPerfil(@Body('perfil_id') perfil_id: string) {
    return this.apilucioService.obtenerVehiculos(perfil_id);
  }

  @Get('vehiculos')
  listarTodosLosVehiculos() {
    return this.apilucioService.listarVehiculos();
  }

  @Post('vehiculos/crear')
  crearVehiculo(@Body() body: {
    placa: string;
    marca: string;
    modelo: string;
    activo: boolean;
    perfil_id: string;
  }) {
    return this.apilucioService.crearVehiculo(body);
  }

  // === RUTAS ===
  @Post('rutas')
  obtenerRutasPorPerfil(@Body('perfil_id') perfil_id: string) {
    return this.apilucioService.obtenerRutas(perfil_id);
  }

  @Get('rutas')
  listarTodasLasRutas() {
    return this.apilucioService.listarRutas();
  }

  @Post('rutas/crear')
  crearRuta(@Body() body: {
    nombre_ruta: string;
    perfil_id: string;
    shape?: any;
    calles_ids?: string[];
  }) {
    return this.apilucioService.crearRuta(body);
  }

  // === RECORRIDOS ===
  @Post('recorridos')
  obtenerRecorridosPorPerfil(@Body('perfil_id') perfil_id: string) {
    return this.apilucioService.obtenerRecorridos(perfil_id);
  }

  @Get('recorridos')
  listarTodosLosRecorridos() {
    return this.apilucioService.listarRecorridos();
  }

  @Post('recorridos/iniciar')
  iniciarRecorrido(@Body() body: {
    ruta_id: string;
    vehiculo_id: string;
    perfil_id: string;
  }) {
    return this.apilucioService.iniciarRecorrido(body);
  }

  // === POSICIONES ===
  @Post('recorridos/:id/posiciones')
  registrarPosicion(
    @Param('id') recorridoId: string,
    @Body() body: {
      lat: number;
      lon: number;
      perfil_id: string;
    }
  ) {
    return this.apilucioService.registrarPosicion(recorridoId, body);
  }

  @Get('posiciones')
  listarTodasLasPosiciones() {
    return this.apilucioService.listarPosiciones();
  }

  // === CALLES ===
  @Post('calles')
  obtenerCallesPorPerfil(@Body('perfil_id') perfil_id: string) {
    return this.apilucioService.obtenerCalles(perfil_id);
  }

  @Get('calles')
  listarTodasLasCalles() {
    return this.apilucioService.listarCalles();
  }

  // === HORARIOS ===
  @Post('horarios')
  obtenerHorariosPorPerfil(@Body('perfil_id') perfil_id: string) {
    return this.apilucioService.obtenerHorarios(perfil_id);
  }

  @Get('horarios')
  listarTodosLosHorarios() {
    return this.apilucioService.listarHorarios();
  }
}
