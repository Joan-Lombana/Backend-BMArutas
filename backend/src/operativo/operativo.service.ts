import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

interface RecorridoApiResponse {
  id: string;
  [key: string]: any;
}

@Injectable()
export class OperativoService {
  private readonly baseUrl: string;

  constructor(private readonly http: HttpService) {
    const url = process.env.ROUTES_SERVICE_URL;

    if (!url) {
      throw new Error("❌ ERROR: ROUTES_SERVICE_URL no está definida");
    }

    this.baseUrl = url.endsWith("/") ? url.slice(0, -1) : url;

    console.log("🌐 ROUTES_SERVICE_URL:", this.baseUrl);
  }

  // ================= HELPERS =================

  private async get<T>(endpoint: string, params?: any): Promise<T> {
    try {
      const { data } = await firstValueFrom(
        this.http.get<T>(`${this.baseUrl}${endpoint}`, { params })
      );
      return data;
    } catch (error: any) {
      throw new InternalServerErrorException(error.response?.data || error.message);
    }
  }

  private async post<T>(endpoint: string, body: any): Promise<T> {
    try {
      const { data } = await firstValueFrom(
        this.http.post<T>(`${this.baseUrl}${endpoint}`, body)
      );
      return data;
    } catch (error: any) {
      throw new InternalServerErrorException(error.response?.data || error.message);
    }
  }

  private async put<T>(endpoint: string, body: any, options?: any): Promise<T> {
    try {
      const { data } = await firstValueFrom(
        this.http.put<T>(`${this.baseUrl}${endpoint}`, body, options)
      );
      return data;
    } catch (error: any) {
      throw new InternalServerErrorException(error.response?.data || error.message);
    }
  }

  private async delete<T>(endpoint: string, options?: any): Promise<T> {
    try {
      const { data } = await firstValueFrom(
        this.http.delete<T>(`${this.baseUrl}${endpoint}`, options)
      );
      return data;
    } catch (error: any) {
      throw new InternalServerErrorException(error.response?.data || error.message);
    }
  }

  // ================= VEHÍCULOS =================

  obtenerVehiculos() {
    return this.get('/vehiculos');
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

  // ================= RUTAS =================

  obtenerRutas() {
    return this.get('/rutas');
  }

  crearRuta(body: any) {
    const shape = body.shape;

    return this.post('/rutas', {
      nombre_ruta: body.nombre_ruta,
      shape: {
        type: shape?.type || "LineString",
        coordinates: Array.isArray(shape?.coordinates) ? shape.coordinates : []
      }
    });
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

  // ================= HORARIOS =================

  obtenerHorarios() {
    return this.get('/horarios');
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

  // ================= RECORRIDOS =================

  obtenerRecorridos() {
    return this.get('/misrecorridos');
  }

  iniciarRecorrido(body: any): Promise<RecorridoApiResponse> {
    // ⚠️ SOLO lo que la API externa permite
    const payload = {
      ruta_id: body.ruta_id,
      vehiculo_id: body.vehiculo_id
    };

    console.log("📡 Enviando a microservicio:", payload);

    return this.post<RecorridoApiResponse>('/recorridos/iniciar', payload);
  }
  finalizarRecorrido(recorridoId: string): Promise<RecorridoApiResponse> {
    console.log("📡 Finalizando recorrido:", recorridoId);
    return this.post<RecorridoApiResponse>(`/recorridos/${recorridoId}/finalizar`, {});
  }

  finalizarRecorridoExterno(apiRecorridoId: string) {
  console.log("🌐 Finalizando SOLO en microservicio:", apiRecorridoId);

  return this.post(
    `/recorridos/${apiRecorridoId}/finalizar`,
    {}
  );
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

  // ================= POSICIONES =================

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

  // ================= CALLES =================

  obtenerCalles() {
    return this.get('/calles');
  }

  crearCalle(body: any) {
    return this.post('/calles', body);
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


