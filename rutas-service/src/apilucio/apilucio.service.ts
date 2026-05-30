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

  async obtenerVehiculo(id: string): Promise<VehiculoAPI> {
  const res = await lastValueFrom(
    this.http.get(
      `${this.baseUrl}/vehiculos/${id}`,
      {
        params: {
          perfil_id: this.perfilId,
        },
      },
    ),
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

  async obtenerRuta(id: string): Promise<RutaAPI> {
  try {
    const res = await lastValueFrom(
      this.http.get(`${this.baseUrl}/rutas/${id}`, {
        params: { perfil_id: this.perfilId },
      }),
    );

    return res.data;
  } catch (error: any) {
    console.log('🔥 ERROR COMPLETO RUTA:');
    console.log(error.response?.data);
    console.log(error.response?.status);
    console.log(error.message);

    throw error;
  }
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
  const payload = {
    lat: body.lat ?? body.latitud,
    lon: body.lon ?? body.longitud,
    perfil_id: this.perfilId,
  };

  const res = await lastValueFrom(
    this.http.post(
      `${this.baseUrl}/recorridos/${recorridoId}/posiciones`,
      payload,
    ),
  );

  return res.data;
}

  async obtenerPosiciones(recorridoId: string): Promise<PosicionAPI[]> {
    const res = await lastValueFrom(
      this.http.get(`${this.baseUrl}/recorridos/${recorridoId}/posiciones`, {
        params: { perfil_id: this.perfilId },
      }),
    );
    return res.data;
  }

  async obtenerPosicion(
    recorridoId: string,
    posicionId: string,
  ): Promise<PosicionAPI> {
    const res = await lastValueFrom(
      this.http.get(
        `${this.baseUrl}/recorridos/${recorridoId}/posiciones/${posicionId}`,
        {
          params: { perfil_id: this.perfilId },
        },
      ),
    );
    return res.data;
  }

  async actualizarPosicion(
    recorridoId: string,
    posicionId: string,
    body: any,
  ): Promise<PosicionAPI> {
    const payload = {
      ...body,
      perfil_id: this.perfilId,
    };

    const res = await lastValueFrom(
      this.http.put(
        `${this.baseUrl}/recorridos/${recorridoId}/posiciones/${posicionId}`,
        payload,
      ),
    );
    return res.data;
  }

  async eliminarPosicion(recorridoId: string, posicionId: string): Promise<any> {
    const res = await lastValueFrom(
      this.http.delete(
        `${this.baseUrl}/recorridos/${recorridoId}/posiciones/${posicionId}`,
        {
          params: { perfil_id: this.perfilId },
        },
      ),
    );
    return res.data;
  }

  async obtenerImagenPosicion(_recorridoId: string, posicionId: string): Promise<any> {
    const res = await lastValueFrom(
      this.http.get(
        `${this.baseUrl}/recorridos/posiciones/${posicionId}/imagen`,
        {
          params: { perfil_id: this.perfilId },
        },
      ),
    );
    return res.data;
  }

  async subirImagenPosicion(posicionId: string, imagen: string): Promise<any> {
    const res = await lastValueFrom(
      this.http.post(
        `${this.baseUrl}/recorridos/posiciones/${posicionId}/imagen`,
        { imagen_base64: imagen, perfil_id: this.perfilId },
      ),
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







