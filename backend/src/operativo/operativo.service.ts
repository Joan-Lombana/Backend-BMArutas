import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpService } from '@nestjs/axios';
import { Repository } from 'typeorm';
import { firstValueFrom } from 'rxjs';
import { PosicionService } from './posicion/posicion.service';
import { OperativoGateway, PosicionTiempoReal } from './operativo.gateway';
import { Recorrido } from './recorrido/entities/recorrido.entity';


interface RecorridoApiResponse {
  id: string;
  [key: string]: any;
}

@Injectable()
export class OperativoService {
  private readonly baseUrl: string;

  constructor(
    private readonly http: HttpService,
    private readonly posicionService: PosicionService,
    private readonly operativoGateway: OperativoGateway,
    @InjectRepository(Recorrido)
    private readonly recorridoRepo: Repository<Recorrido>,
  ) {
    const url = process.env.ROUTES_SERVICE_URL;

    if (!url) {
      throw new Error("❌ ERROR: ROUTES_SERVICE_URL no está definida");
    }

    let baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;
    if (!baseUrl.endsWith('/apilucio')) {
      baseUrl += '/apilucio';
    }

    this.baseUrl = baseUrl;

    console.log('🌐 ROUTES_SERVICE_URL:', this.baseUrl);
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

  // Emitir cambio de estado del recorrido
  emitirEstadoRecorrido(recorridoId: string, estado: string) {
    this.operativoGateway.emitirEstadoRecorrido(recorridoId, estado);
  }

  // Emitir eliminación de recorrido
  emitirRecorridoEliminado(recorridoId: string) {
    this.operativoGateway.emitirRecorridoEliminado(recorridoId);
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

  // ================= UTILIDAD =================

  private async obtenerApiRecorridoId(recorridoId: string): Promise<string | null> {
    const recorrido = await this.recorridoRepo.findOne({
      where: { id: recorridoId },
    });

    return recorrido?.api_recorrido_id ?? null;
  }

  // ================= POSICIONES =================

  async crearPosicion(recorridoId: string, body: any) {
  // 1. Validar recorrido local
  const recorrido = await this.recorridoRepo.findOne({
    where: { id: recorridoId },
  });

  if (!recorrido) {
    throw new NotFoundException('Recorrido local no existe');
  }

  // 2. Guardar local SIEMPRE
  const posicion = await this.posicionService.create({
    recorridoId: recorrido.id,
    latitud: body.latitud ?? body.lat,
    longitud: body.longitud ?? body.lon,
    timestamp: body.timestamp ?? Date.now(),
    velocidad: body.velocidad,
  });

  // 3. Emitir WebSocket
  this.operativoGateway.emitirPosicion(recorridoId, {
    id: posicion.id,
    recorridoId: posicion.recorridoId,
    latitud: posicion.latitud,
    longitud: posicion.longitud,
    timestamp: posicion.timestamp,
    velocidad: posicion.velocidad,
    createdAt: posicion.createdAt,
  });

  // 4. Sincronizar con microservicio (SI EXISTE)
  if (recorrido.api_recorrido_id) {
    try {
      await this.post(
        `/recorridos/${recorrido.api_recorrido_id}/posiciones`,
        {
          lat: posicion.latitud,
          lon: posicion.longitud,
          perfil_id: body.perfil_id ?? null,
        },
      );
    } catch (error: any) {
      console.error('❌ Error API externa:', error.message);
    }
  }
    return posicion;
  }

  async obtenerPosiciones(recorridoId: string) {
    return this.posicionService.obtenerPosicionesPorRecorrido(recorridoId);
  }

  async actualizarPosicion(recorridoId: string, posicionId: string, body: any) {
    const updatedLocal = await this.posicionService.update(posicionId, {
      latitud: body.latitud ?? body.lat,
      longitud: body.longitud ?? body.lon,
      timestamp: body.timestamp,
      velocidad: body.velocidad,
    });

    try {
      const apiRecorridoId = await this.obtenerApiRecorridoId(recorridoId);

      if (apiRecorridoId) {
        await this.put(
          `/recorridos/${apiRecorridoId}/posiciones/${posicionId}`,
          body, // 👈 SIN TRANSFORMAR
        );
      }
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : String(error);

      console.error(
        '❌ Error sincronizando actualización de posición:',
        message,
      );
    }

    this.operativoGateway.emitirPosicionActualizada(recorridoId, {
      id: updatedLocal.id,
      recorridoId: updatedLocal.recorridoId,
      latitud: updatedLocal.latitud,
      longitud: updatedLocal.longitud,
      timestamp: updatedLocal.timestamp,
      velocidad: updatedLocal.velocidad,
      createdAt: updatedLocal.createdAt,
    });

    return updatedLocal;
  }

  async eliminarPosicion(recorridoId: string, posicionId: string) {
    const deletedLocal =
      await this.posicionService.remove(posicionId);

    try {
      const apiRecorridoId = await this.obtenerApiRecorridoId(recorridoId);

      if (apiRecorridoId) {
        await this.delete(
          `/recorridos/${apiRecorridoId}/posiciones/${posicionId}`,
        );
      }
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : String(error);

      console.error(
        '❌ Error sincronizando eliminación de posición:',
        message,
      );
    }

    this.operativoGateway.emitirPosicion(
      recorridoId,
      deletedLocal,
    );

    return deletedLocal;
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


