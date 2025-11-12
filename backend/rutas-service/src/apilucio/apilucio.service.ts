import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

import { CalleAPI } from '../interfaces/calle.interface';
import { RutaAPI } from '../interfaces/ruta.interface';
import { VehiculoAPI } from '../interfaces/vehiculo.interface';
import { HorarioAPI } from '../interfaces/horario.interface';
import { RecorridoAPI } from '../interfaces/recorrido.interface';
import { PosicionAPI } from '../interfaces/posicion.interface';


@Injectable()
export class ApilucioService {
  private readonly baseUrl = 'http://apirecoleccion.gonzaloandreslucio.com/api';

  constructor(private readonly http: HttpService) {
    console.log('✅ ApilucioService cargado');
  }

  // --- RUTAS ---
  async obtenerRutas(): Promise<RutaAPI[]> {
    const res = await lastValueFrom(this.http.get(`${this.baseUrl}/rutas`));
    return res.data;
  }

  // --- CALLES ---
  async obtenerCalles(): Promise<CalleAPI[]> {
    const res = await lastValueFrom(this.http.get(`${this.baseUrl}/calles`));
    return res.data;
  }

  // --- VEHÍCULOS ---
  async obtenerVehiculos(): Promise<VehiculoAPI[]> {
    const res = await lastValueFrom(this.http.get(`${this.baseUrl}/vehiculos`));
    return res.data;
  }

  // --- HORARIOS ---
  async obtenerHorarios(): Promise<HorarioAPI[]> {
    const res = await lastValueFrom(this.http.get(`${this.baseUrl}/horarios`));
    return res.data;
  }

  // --- RECORRIDOS ---
  async obtenerRecorridos(): Promise<RecorridoAPI[]> {
    const res = await lastValueFrom(this.http.get(`${this.baseUrl}/misrecorridos`));
    return res.data;
  }

  // --- POSICIONES ---
  async obtenerPosiciones(recorridoId: number): Promise<PosicionAPI[]> {
    const res = await lastValueFrom(this.http.get(`${this.baseUrl}/recorridos/${recorridoId}/posiciones`));
    return res.data;
  }

 
}
