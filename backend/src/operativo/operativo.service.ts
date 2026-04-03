import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class OperativoService {
  private readonly baseUrl: string;

  constructor(private readonly http: HttpService) {
  const url = process.env.ROUTES_SERVICE_URL;

  if (!url) {
    throw new Error("❌ ERROR: La variable ROUTES_SERVICE_URL no está definida");
  }

  // Quitar barra final si la ponen accidentalmente
  this.baseUrl = url.endsWith("/") ? url.slice(0, -1) : url;

  console.log("🌐 ROUTES_SERVICE_URL cargada:", this.baseUrl);
}

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
    const url = `${this.baseUrl}${endpoint}`;

    console.log('🌐 BASE URL:', this.baseUrl);
    console.log('📍 ENDPOINT:', endpoint);
    console.log('🔗 URL FINAL:', url);
    console.log('📦 BODY:', body);

    const { data } = await firstValueFrom(
      this.http.post<T>(url, body)
    );

    console.log('✅ Respuesta POST:', data);

    return data;
  } catch (error: any) {
    console.error('❌ Error POST:', error.response?.data || error.message);
    throw new InternalServerErrorException(
      error.response?.data || error.message
    );
  }
  }
    
  private async put<T>(endpoint: string, body: any, options?: any): Promise<T> {
    try {
      const { data } = await firstValueFrom(this.http.put<T>(`${this.baseUrl}${endpoint}`, body, options));
      return data;
    } catch (error: any) {
      throw new InternalServerErrorException(error.response?.data || error.message);
    }
  }

  private async delete<T>(endpoint: string, options?: any): Promise<T> {
    try {
      const { data } = await firstValueFrom(this.http.delete<T>(`${this.baseUrl}${endpoint}`, options));
      return data;
    } catch (error: any) {
      throw new InternalServerErrorException(error.response?.data || error.message);
    }
  }


  

  // ====================================================
  // ================   VEHÍCULOS   =====================
  // ====================================================

  obtenerVehiculosPorPerfil(perfil_id: string) {
    return this.get('/vehiculos', { perfil_id });
  }

  crearVehiculo(body: any) {
    return this.post('/vehiculos', body);
  }

  obtenerVehiculoPorId(id: string) {
    return this.get(`/vehiculos/${id}`);
  }

  actualizarVehiculo(id: string, body: any, perfil_id: string) {
  return this.put(`/vehiculos/${id}`, body, { params: { perfil_id } });
}

eliminarVehiculo(id: string, perfil_id: string) {
  return this.delete(`/vehiculos/${id}`, { params: { perfil_id } });
}




  // ====================================================
  // ====================   RUTAS   =====================
  // ====================================================

  obtenerRutasPorPerfil(perfil_id: string) {
    return this.get('/rutas', { perfil_id });
  }
  crearRuta(body: any) {

    // 🔍 Normalizar el GeoJSON antes de enviarlo
    const shape = body.shape;

    const payload = {
      nombre_ruta: body.nombre_ruta,
      perfil_id: body.perfil_id,
      shape: {
        type: shape?.type || "LineString",
        coordinates: Array.isArray(shape?.coordinates) ? shape.coordinates : []
      }
    };

    console.log("📦 Payload final enviado a rutas-service:", payload);

    return this.post('/rutas', payload);
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

  // ====================================================
  // ===================   HORARIOS   ===================
  // ====================================================

  obtenerHorariosPorPerfil(perfil_id: string) {
    return this.get('/horarios', { perfil_id });
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

  // ====================================================
  // ==================   RECORRIDOS   ==================
  // ====================================================

  obtenerRecorridosPorPerfil(perfil_id: string) {
    return this.get('/misrecorridos', { perfil_id });
  }

  crearRecorrido(body: any) {

    const perfil_id_api = process.env.PERFIL_API;

    const payload = {
      ruta_id: body.ruta_id,
      vehiculo_id: body.vehiculo_id,
      perfil_id: perfil_id_api,
      estado: 'asignado'
    };

    console.log("📦 Payload enviado a API:", payload);

    // 👉 AQUÍ envías a apilucio
    return this.post('/recorridos/crear', payload);
    

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

  // ====================================================
  // ===================  POSICIONES  ===================
  // ====================================================

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

  // ====================================================
  // ====================   CALLES   =====================
  // ====================================================

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


