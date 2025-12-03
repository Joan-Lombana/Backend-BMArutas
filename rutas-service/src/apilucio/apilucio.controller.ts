import { 
  Controller, 
  Get, 
  Post, 
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
import { CrearRecorridoDto } from './dto/crear-recorrido.dto';
import { CrearPosicionDto } from './dto/crear-posicion.dto';


@Controller('apilucio')
export class ApilucioController {
  constructor(private readonly apilucioService: ApilucioService) {}

  // ================= VEHÍCULOS =================
  @Get('vehiculos')
  async obtenerVehiculosPorPerfil(
    @Query('perfil_id') perfil_id: string
  ): Promise<VehiculoAPI[]> {
    if (!perfil_id) throw new BadRequestException('Debe enviarse perfil_id');
    return this.apilucioService.obtenerVehiculosPorPerfil(perfil_id);
  }

  @Post('vehiculos')
  async crearVehiculo(@Body() body: CrearVehiculoDto) {
    return this.apilucioService.crearVehiculo(body);
  }

  // ================= RUTAS =================
  @Get('rutas')
  async obtenerRutasPorPerfil(
    @Query('perfil_id') perfil_id: string
  ): Promise<RutaAPI[]> {
    if (perfil_id) return this.apilucioService.obtenerRutasPorPerfil(perfil_id);
    return this.apilucioService.listarRutas();
  }

  @Post('rutas')
  async crearRuta(@Body() body: CrearRutaDto) {
    return this.apilucioService.crearRuta(body);
  }

  // ================= RECORRIDOS =================
  @Get('recorridos')
  async obtenerRecorridosPorPerfil(
    @Query('perfil_id') perfil_id: string
  ): Promise<RecorridoAPI[]> {
    if (perfil_id) return this.apilucioService.obtenerRecorridosPorPerfil(perfil_id);
    return this.apilucioService.listarRecorridos();
  }

  @Post('recorridos/iniciar')
  async iniciarRecorrido(@Body() body: CrearRecorridoDto) {
    return this.apilucioService.iniciarRecorrido(body);
  }

  // ================= POSICIONES =================
  @Get('posiciones')
  async listarTodasLasPosiciones(): Promise<PosicionAPI[]> {
    return this.apilucioService.listarPosiciones();
  }

  @Post('recorridos/:id/posiciones')
  async registrarPosicion(
    @Param('id') recorridoId: string, 
    @Body() body: CrearPosicionDto
  ) {
    return this.apilucioService.registrarPosicion(recorridoId, body);
  }

  // ================= CALLES =================
  @Get('calles')
  async obtenerCallesPorPerfil(
    @Query('perfil_id') perfil_id: string
  ): Promise<CalleAPI[]> {
    if (perfil_id) return this.apilucioService.obtenerCallesPorPerfil(perfil_id);
    return this.apilucioService.listarCalles();
  }

  

  // ================= HORARIOS =================
  @Get('horarios')
  async obtenerHorariosPorPerfil(
    @Query('perfil_id') perfil_id: string
  ): Promise<HorarioAPI[]> {
    if (perfil_id) return this.apilucioService.obtenerHorariosPorPerfil(perfil_id);
    return this.apilucioService.listarHorarios();
  }
  
}


