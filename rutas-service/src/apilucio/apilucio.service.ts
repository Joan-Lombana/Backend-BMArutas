import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

import { RutaAPI } from '../interfaces/ruta.interface';
import { CalleAPI } from '../interfaces/calle.interface';
import { VehiculoAPI } from '../interfaces/vehiculo.interface';
import { HorarioAPI } from '../interfaces/horario.interface';
import { RecorridoAPI } from '../interfaces/recorrido.interface';
import { PosicionAPI } from '../interfaces/posicion.interface';

@Injectable()
export class ApilucioService {
  private readonly baseUrl = 'http://apirecoleccion.gonzaloandreslucio.com/api';

  constructor(private readonly http: HttpService) {}

  // === VEHÍCULOS ===
  async obtenerVehiculos(perfil_id: string): Promise<VehiculoAPI[]> {
    const res = await lastValueFrom(
      this.http.post(`${this.baseUrl}/vehiculos`, { perfil_id })
    );
    return res.data;
  }

  async listarVehiculos(): Promise<VehiculoAPI[]> {
    const res = await lastValueFrom(
      this.http.get(`${this.baseUrl}/vehiculos`)
    );
    return res.data;
  }

  async crearVehiculo(body: {
    placa: string;
    marca: string;
    modelo: string;
    activo: boolean;
    perfil_id: string;
  }): Promise<any> {
    const res = await lastValueFrom(
      this.http.post(`${this.baseUrl}/vehiculos`, body)
    );
    return res.data;
  }

  // === RUTAS ===
  async obtenerRutas(perfil_id: string): Promise<RutaAPI[]> {
    const res = await lastValueFrom(
      this.http.post(`${this.baseUrl}/rutas`, { perfil_id })
    );
    return res.data;
  }

  async listarRutas(): Promise<RutaAPI[]> {
    const res = await lastValueFrom(
      this.http.get(`${this.baseUrl}/rutas`)
    );
    return res.data;
  }

  async crearRuta(body: {
    nombre_ruta: string;
    perfil_id: string;
    shape?: any;
    calles_ids?: string[];
  }): Promise<any> {
    const res = await lastValueFrom(
      this.http.post(`${this.baseUrl}/rutas`, body)
    );
    return res.data;
  }

  // === RECORRIDOS ===
  async obtenerRecorridos(perfil_id: string): Promise<RecorridoAPI[]> {
    const res = await lastValueFrom(
      this.http.post(`${this.baseUrl}/misrecorridos`, { perfil_id })
    );
    return res.data;
  }

  async listarRecorridos(): Promise<RecorridoAPI[]> {
    const res = await lastValueFrom(
      this.http.get(`${this.baseUrl}/recorridos`)
    );
    return res.data;
  }

  async iniciarRecorrido(body: {
    ruta_id: string;
    vehiculo_id: string;
    perfil_id: string;
  }): Promise<any> {
    const res = await lastValueFrom(
      this.http.post(`${this.baseUrl}/recorridos/iniciar`, body)
    );
    return res.data;
  }

  // === POSICIONES ===
  async obtenerPosiciones(recorridoId: number): Promise<PosicionAPI[]> {
    const res = await lastValueFrom(
      this.http.get(`${this.baseUrl}/recorridos/${recorridoId}/posiciones`)
    );
    return res.data;
  }

  async listarPosiciones(): Promise<PosicionAPI[]> {
    const res = await lastValueFrom(
      this.http.get(`${this.baseUrl}/posiciones`)
    );
    return res.data;
  }

  async registrarPosicion(recorridoId: string, body: {
    lat: number;
    lon: number;
    perfil_id: string;
  }): Promise<any> {
    const res = await lastValueFrom(
      this.http.post(`${this.baseUrl}/recorridos/${recorridoId}/posiciones`, body)
    );
    return res.data;
  }

  // === CALLES ===
  async obtenerCalles(perfil_id: string): Promise<CalleAPI[]> {
    const res = await lastValueFrom(
      this.http.post(`${this.baseUrl}/calles`, { perfil_id })
    );
    return res.data;
  }

  async listarCalles(): Promise<CalleAPI[]> {
    const res = await lastValueFrom(
      this.http.get(`${this.baseUrl}/calles`)
    );
    return res.data;
  }

  // === HORARIOS ===
  async obtenerHorarios(perfil_id: string): Promise<HorarioAPI[]> {
    const res = await lastValueFrom(
      this.http.post(`${this.baseUrl}/horarios`, { perfil_id })
    );
    return res.data;
  }

  async listarHorarios(): Promise<HorarioAPI[]> {
    const res = await lastValueFrom(
      this.http.get(`${this.baseUrl}/horarios`)
    );
    return res.data;
  }
}