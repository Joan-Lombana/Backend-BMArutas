import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class OperativoService {
  private readonly baseUrl: string;

  constructor(private readonly http: HttpService) {
    this.baseUrl = process.env.ROUTES_SERVICE_URL || 'http://rutas-service:3001';
  }

  private async get<T>(endpoint: string): Promise<T> {
    try {
      const { data } = await firstValueFrom(this.http.get<T>(`${this.baseUrl}${endpoint}`));
      return data;
    } catch (error: any) {
      throw new InternalServerErrorException(error.response?.data || error.message);
    }
  }

  private async post<T>(endpoint: string, body: any): Promise<T> {
    try {
      const { data } = await firstValueFrom(this.http.post<T>(`${this.baseUrl}${endpoint}`, body));
      return data;
    } catch (error: any) {
      throw new InternalServerErrorException(error.response?.data || error.message);
    }
  }

  private async put<T>(endpoint: string, body: any): Promise<T> {
    try {
      const { data } = await firstValueFrom(this.http.put<T>(`${this.baseUrl}${endpoint}`, body));
      return data;
    } catch (error: any) {
      throw new InternalServerErrorException(error.response?.data || error.message);
    }
  }

  private async delete<T>(endpoint: string): Promise<T> {
    try {
      const { data } = await firstValueFrom(this.http.delete<T>(`${this.baseUrl}${endpoint}`));
      return data;
    } catch (error: any) {
      throw new InternalServerErrorException(error.response?.data || error.message);
    }
  }

  // === VEHÍCULOS ===
  obtenerVehiculosPorPerfil(perfil_id: string) {
    return this.get(`/vehiculos?perfil_id=${perfil_id}`);
  }

  crearVehiculo(body: any) {
    return this.post('/vehiculos', body);
  }

  obtenerVehiculoPorId(id: string) {
    return this.get(`/vehiculos/${id}`);
  }

  actualizarVehiculo(id: string, body: any) {
    return this.put(`/vehiculos/${id}`, body);
  }

  eliminarVehiculo(id: string) {
    return this.delete(`/vehiculos/${id}`);
  }

  // === RUTAS ===
  obtenerRutasPorPerfil(perfil_id: string) {
    return this.post('/rutas', { perfil_id });
  }

  crearRuta(body: any) {
    return this.post('/rutas', body);
  }

  obtenerRutaPorId(id: string) {
    return this.get(`/rutas/${id}`);
  }

  actualizarRuta(id: string, body: any) {
    return this.put(`/rutas/${id}`, body);
  }

  eliminarRuta(id: string) {
    return this.delete(`/rutas/${id}`);
  }

  // === HORARIOS ===
  obtenerHorariosPorPerfil(perfil_id: string) {
    return this.post('/horarios', { perfil_id });
  }

  crearHorario(body: any) {
    return this.post('/horarios', body);
  }

  obtenerHorarioPorId(id: string) {
    return this.get(`/horarios/${id}`);
  }

  actualizarHorario(id: string, body: any) {
    return this.put(`/horarios/${id}`, body);
  }

  eliminarHorario(id: string) {
    return this.delete(`/horarios/${id}`);
  }

  // === RECORRIDOS ===
  obtenerRecorridosPorPerfil(perfil_id: string) {
    return this.post('/misrecorridos', { perfil_id });
  }

  crearRecorrido(body: any) {
    return this.post('/recorridos', body);
  }

  obtenerRecorridoPorId(id: string) {
    return this.get(`/recorridos/${id}`);
  }

  actualizarRecorrido(id: string, body: any) {
    return this.put(`/recorridos/${id}`, body);
  }

  eliminarRecorrido(id: string) {
    return this.delete(`/recorridos/${id}`);
  }

  // === POSICIONES ===
  obtenerPosiciones(recorridoId: string) {
    return this.get(`/recorridos/${recorridoId}/posiciones`);
  }

  crearPosicion(recorridoId: string, body: any) {
    return this.post(`/recorridos/${recorridoId}/posiciones`, body);
  }

  obtenerPosicionPorId(recorridoId: string, posicionId: string) {
    return this.get(`/recorridos/${recorridoId}/posiciones/${posicionId}`);
  }

  actualizarPosicion(recorridoId: string, posicionId: string, body: any) {
    return this.put(`/recorridos/${recorridoId}/posiciones/${posicionId}`, body);
  }

  eliminarPosicion(recorridoId: string, posicionId: string) {
    return this.delete(`/recorridos/${recorridoId}/posiciones/${posicionId}`);
  }

  // === CALLES ===
  obtenerCalles() {
    return this.get(`/calles`);
  }

  crearCalle(body: any) {
    return this.post(`/calles`, body);
  }

  obtenerCallePorId(id: string) {
    return this.get(`/calles/${id}`);
  }

  actualizarCalle(id: string, body: any) {
    return this.put(`/calles/${id}`, body);
  }

  eliminarCalle(id: string) {
    return this.delete(`/calles/${id}`);
  }
}

