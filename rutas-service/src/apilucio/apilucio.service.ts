import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { VehiculoAPI } from '../interfaces/vehiculo.interface';
import { RutaAPI } from '../interfaces/ruta.interface';
import { RecorridoAPI } from '../interfaces/recorrido.interface';
import { PosicionAPI } from '../interfaces/posicion.interface';
import { CalleAPI } from '../interfaces/calle.interface';
import { HorarioAPI } from '../interfaces/horario.interface';

@Injectable()
export class ApilucioService {
  private readonly baseUrl = 'http://apirecoleccion.gonzaloandreslucio.com/api';

  constructor(private readonly http: HttpService) {}

  // ================= VEHÍCULOS =================
  async obtenerVehiculosPorPerfil(perfil_id: string): Promise<VehiculoAPI[]> {
    const res = await lastValueFrom(
      this.http.get(`${this.baseUrl}/vehiculos`, { params: { perfil_id } })
    );
    return res.data;
  }

  async crearVehiculo(body: { placa: string; perfil_id: string; marca?: string; modelo?: string; activo?: boolean; }): Promise<VehiculoAPI> {
    if (!body.placa || !body.perfil_id) {
      throw new Error('placa y perfil_id son obligatorios');
    }
    const res = await lastValueFrom(
      this.http.post(`${this.baseUrl}/vehiculos`, body)
    );
    return res.data;
  }

  // ================= RUTAS =================
  async listarRutas(): Promise<RutaAPI[]> {
    const res = await lastValueFrom(this.http.get(`${this.baseUrl}/rutas`));
    return res.data;
  }

  async obtenerRutasPorPerfil(perfil_id: string): Promise<RutaAPI[]> {
    const res = await lastValueFrom(
      this.http.get(`${this.baseUrl}/rutas`, { params: { perfil_id } })
    );
    return res.data;
  }

  async crearRuta(body: any): Promise<any> {
    const res = await lastValueFrom(this.http.post(`${this.baseUrl}/rutas`, body));
    return res.data;
  }

  // ================= RECORRIDOS =================
  async listarRecorridos(): Promise<RecorridoAPI[]> {
    const res = await lastValueFrom(this.http.get(`${this.baseUrl}/recorridos`));
    return res.data;
  }

  async obtenerRecorridosPorPerfil(perfil_id: string): Promise<RecorridoAPI[]> {
    const res = await lastValueFrom(
      this.http.get(`${this.baseUrl}/misrecorridos`, { params: { perfil_id } })
    );
    return res.data;
  }

  async iniciarRecorrido(body: any): Promise<any> {
    const res = await lastValueFrom(this.http.post(`${this.baseUrl}/recorridos/iniciar`, body));
    return res.data;
  }

  // ================= POSICIONES =================
  async listarPosiciones(): Promise<PosicionAPI[]> {
    const res = await lastValueFrom(this.http.get(`${this.baseUrl}/posiciones`));
    return res.data;
  }

  async registrarPosicion(recorridoId: string, body: any): Promise<any> {
    const res = await lastValueFrom(
      this.http.post(`${this.baseUrl}/recorridos/${recorridoId}/posiciones`, body)
    );
    return res.data;
  }

  // ================= CALLES =================
  async listarCalles(): Promise<CalleAPI[]> {
    const res = await lastValueFrom(this.http.get(`${this.baseUrl}/calles`));
    return res.data;
  }

  async obtenerCallesPorPerfil(perfil_id: string): Promise<CalleAPI[]> {
    const res = await lastValueFrom(
      this.http.get(`${this.baseUrl}/calles`, { params: { perfil_id } })
    );
    return res.data;
  }

  // ================= HORARIOS =================
  async listarHorarios(): Promise<HorarioAPI[]> {
    const res = await lastValueFrom(this.http.get(`${this.baseUrl}/horarios`));
    return res.data;
  }

  async obtenerHorariosPorPerfil(perfil_id: string): Promise<HorarioAPI[]> {
    const res = await lastValueFrom(
      this.http.get(`${this.baseUrl}/horarios`, { params: { perfil_id } })
    );
    return res.data;
  }
}







