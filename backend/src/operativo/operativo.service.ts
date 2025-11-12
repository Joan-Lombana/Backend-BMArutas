import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

import {RutaAPI,CalleAPI,VehiculoAPI,HorarioAPI,RecorridoAPI,PosicionAPI,} from './operativo.interfaces';



@Injectable()
export class OperativoService {
  private readonly baseUrl: string;

  constructor(private readonly http: HttpService) {
    // Permite configuración dinámica
    this.baseUrl =
      process.env.ROUTES_SERVICE_URL || 'http://rutas-service:3001/apilucio';
    console.log(`🌐 OperativoService apuntando a: ${this.baseUrl}`);
  }

  private async getFromMicroservice<T>(endpoint: string): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    try {
      const { data } = await firstValueFrom(
        this.http.get<T>(url, { timeout: 5000 })
      );
      return data;
    } catch (error) {
      console.error(`❌ Error al obtener datos desde ${url}`);
      console.error('Mensaje:', error.message);
      console.error('Código:', error.code);
      throw new InternalServerErrorException(
        `No se pudo obtener datos desde ${url}`
      );
    }
  }

  // === RUTAS ===
  async obtenerRutasDesdeMicroservicio(): Promise<RutaAPI[]> {
    return this.getFromMicroservice<RutaAPI[]>('/rutas');
  }

  // === CALLES ===
  async obtenerCallesDesdeMicroservicio(): Promise<CalleAPI[]> {
    return this.getFromMicroservice<CalleAPI[]>('/calles');
  }

  // === VEHÍCULOS ===
  async obtenerVehiculosDesdeMicroservicio(): Promise<VehiculoAPI[]> {
    return this.getFromMicroservice<VehiculoAPI[]>('/vehiculos');
  }

  // === HORARIOS ===
  async obtenerHorariosDesdeMicroservicio(): Promise<HorarioAPI[]> {
    return this.getFromMicroservice<HorarioAPI[]>('/horarios');
  }

  // === RECORRIDOS ===
  async obtenerRecorridosDesdeMicroservicio(): Promise<RecorridoAPI[]> {
    return this.getFromMicroservice<RecorridoAPI[]>('/recorridos');
  }

  // === POSICIONES ===
  async obtenerPosicionesDesdeMicroservicio(
    recorridoId: number
  ): Promise<PosicionAPI[]> {
    return this.getFromMicroservice<PosicionAPI[]>(
      `/recorridos/${recorridoId}/posiciones`
    );
  }

}




