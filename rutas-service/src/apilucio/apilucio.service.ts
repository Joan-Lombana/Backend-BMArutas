import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { VehiculoAPI } from '../interfaces/vehiculo.interface';
import { RutaAPI } from '../interfaces/ruta.interface';
import { RecorridoAPI } from '../interfaces/recorrido.interface';
import { CrearRecorridoApiDto } from './dto/crear-recorrido.dto';
import { PosicionAPI } from '../interfaces/posicion.interface';
import { CalleAPI } from '../interfaces/calle.interface';
import { HorarioAPI } from '../interfaces/horario.interface';

@Injectable()
export class ApilucioService {
  private readonly baseUrl = 'https://apirecoleccion.gonzaloandreslucio.com/api';
  private readonly perfilId: string;

  constructor(private readonly http: HttpService) {
    const perfil = process.env.PERFIL_API;

    if (!perfil) {
      throw new Error('❌ PERFIL_API no está definida');
    }

    this.perfilId = perfil;

    console.log('👤 PERFIL_API (microservicio):', this.perfilId);
  }

  // ================= VEHÍCULOS =================

  async obtenerVehiculos(): Promise<VehiculoAPI[]> {
    const res = await lastValueFrom(
      this.http.get(`${this.baseUrl}/vehiculos`, {
        params: { perfil_id: this.perfilId },
      }),
    );
    return res.data;
  }

  async crearVehiculo(body: { placa: string; marca?: string; modelo?: string; activo?: boolean }): Promise<VehiculoAPI> {
    const res = await lastValueFrom(
      this.http.post(`${this.baseUrl}/vehiculos`, {
        ...body,
        perfil_id: this.perfilId,
      }),
    );
    return res.data;
  }

  async eliminarVehiculo(id: string): Promise<{ message: string }> {
    const res = await lastValueFrom(
      this.http.delete(`${this.baseUrl}/vehiculos/${id}`, {
        params: { perfil_id: this.perfilId },
      }),
    );
    return res.data;
  }

  async actualizarVehiculo(id: string, datos: Partial<VehiculoAPI>): Promise<VehiculoAPI> {
    const res = await lastValueFrom(
      this.http.put(`${this.baseUrl}/vehiculos/${id}`, datos, {
        params: { perfil_id: this.perfilId },
      }),
    );
    return res.data;
  }

  // ================= RUTAS =================

  async obtenerRutas(): Promise<RutaAPI[]> {
    const res = await lastValueFrom(
      this.http.get(`${this.baseUrl}/rutas`, {
        params: { perfil_id: this.perfilId },
      }),
    );
    return res.data;
  }

  async crearRuta(body: any): Promise<any> {
    const res = await lastValueFrom(
      this.http.post(`${this.baseUrl}/rutas`, {
        ...body,
        perfil_id: this.perfilId,
      }),
    );
    return res.data;
  }

  // ================= RECORRIDOS =================

  async obtenerRecorridos(): Promise<RecorridoAPI[]> {
    const res = await lastValueFrom(
      this.http.get(`${this.baseUrl}/misrecorridos`, {
        params: { perfil_id: this.perfilId },
      }),
    );
    return res.data;
  }



  async iniciarRecorrido(body: CrearRecorridoApiDto): Promise<any> {
    const payload = {
      ...body,
      perfil_id: this.perfilId,
    };

    const res = await lastValueFrom(
      this.http.post(`${this.baseUrl}/recorridos/iniciar`, payload),
    );

    return res.data;
  }

  async finalizarRecorrido(recorridoId: string): Promise<any> {
  const res = await lastValueFrom(
    this.http.post(
      `${this.baseUrl}/recorridos/${recorridoId}/finalizar`,
      {
        perfil_id: this.perfilId,
      }
    ),
  );

  return res.data;
}

  // ================= POSICIONES =================

  async registrarPosicion(recorridoId: string, body: any): Promise<any> {
    const res = await lastValueFrom(
      this.http.post(`${this.baseUrl}/recorridos/${recorridoId}/posiciones`, body),
    );
    return res.data;
  }

  // ================= CALLES =================

  async obtenerCalles(): Promise<CalleAPI[]> {
    const res = await lastValueFrom(this.http.get(`${this.baseUrl}/calles`));
    return res.data;
  }

  // ================= HORARIOS =================

  async obtenerHorarios(): Promise<HorarioAPI[]> {
    const res = await lastValueFrom(
      this.http.get(`${this.baseUrl}/horarios`, {
        params: { perfil_id: this.perfilId },
      }),
    );
    return res.data;
  }
}







