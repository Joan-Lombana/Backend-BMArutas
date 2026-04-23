import { 
  Controller, 
  Get, 
  Post,
  Put,
  Delete, 
  Body, 
  Param, 
  Query, 
  BadRequestException 
} from '@nestjs/common';
import { ApilucioService } from './apilucio.service';

// ====== Interfaces (tipado de respuestas) ======
import { VehiculoAPI } from '../interfaces/vehiculo.interface';
import { RutaAPI } from '../interfaces/ruta.interface';
import { RecorridoAPI } from '../interfaces/recorrido.interface';
import { PosicionAPI } from '../interfaces/posicion.interface';
import { CalleAPI } from '../interfaces/calle.interface';
import { HorarioAPI } from '../interfaces/horario.interface';

// ====== DTOs (validación de entradas) ======
import { CrearVehiculoDto } from './dto/crear-vehiculo.dto';
import { CrearRutaDto } from './dto/crear-ruta.dto';
import { CrearRecorridoApiDto } from './dto/crear-recorrido.dto';
import { CrearPosicionDto } from './dto/crear-posicion.dto';


@Controller('apilucio')
export class ApilucioController {
  constructor(private readonly apilucioService: ApilucioService) {}

  // ================= VEHÍCULOS =================
  @Get('vehiculos')
  obtenerVehiculos(): Promise<VehiculoAPI[]> {
    return this.apilucioService.obtenerVehiculos();
  }

  @Post('vehiculos')
  crearVehiculo(@Body() body: CrearVehiculoDto) {
    return this.apilucioService.crearVehiculo(body);
  }

  @Put('vehiculos/:id')
  actualizarVehiculo(
    @Param('id') id: string,
    @Body() body: Partial<VehiculoAPI>
  ): Promise<VehiculoAPI> {
    return this.apilucioService.actualizarVehiculo(id, body);
  }

  @Delete('vehiculos/:id')
  eliminarVehiculo(@Param('id') id: string) {
    return this.apilucioService.eliminarVehiculo(id);
  }

  // ================= RUTAS =================
  @Get('rutas')
  obtenerRutas(): Promise<RutaAPI[]> {
    return this.apilucioService.obtenerRutas();
  }

  @Post('rutas')
  crearRuta(@Body() body: CrearRutaDto) {
    return this.apilucioService.crearRuta(body);
  }

  // ================= RECORRIDOS =================
  @Get('misrecorridos')
  obtenerRecorridos(): Promise<RecorridoAPI[]> {
    return this.apilucioService.obtenerRecorridos();
  }

  @Post('recorridos/iniciar')
  iniciarRecorrido(@Body() body: CrearRecorridoApiDto) {
    return this.apilucioService.iniciarRecorrido(body);
  }

  @Post('recorridos/:id/finalizar')
  finalizarRecorrido(@Param('id') recorridoId: string) {
    return this.apilucioService.finalizarRecorrido(recorridoId);
  }

  // ================= POSICIONES =================
  @Post('recorridos/:id/posiciones')
  registrarPosicion(
    @Param('id') recorridoId: string,
    @Body() body: CrearPosicionDto
  ) {
    return this.apilucioService.registrarPosicion(recorridoId, body);
  }

  // ================= CALLES =================
  @Get('calles')
  obtenerCalles(): Promise<CalleAPI[]> {
    return this.apilucioService.obtenerCalles();
  }

  // ================= HORARIOS =================
  @Get('horarios')
  obtenerHorarios(): Promise<HorarioAPI[]> {
    return this.apilucioService.obtenerHorarios();
  }
}


