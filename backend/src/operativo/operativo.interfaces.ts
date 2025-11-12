export interface RutaAPI {
  id: number;
  nombre: string;
  descripcion?: string;
}

export interface CalleAPI {
  id: number;
  nombre: string;
  longitud?: number;
}

export interface VehiculoAPI {
  id: number;
  placa: string;
  tipo: string;
}

export interface HorarioAPI {
  id: number;
  inicio: string;
  fin: string;
  rutaId?: number;
}

export interface RecorridoAPI {
  id: number;
  rutaId: number;
  fechaInicio: string;
  fechaFin?: string;
  estado: string;
}

export interface PosicionAPI {
  id: number;
  recorridoId: number;
  latitud: number;
  longitud: number;
  timestamp: string;
}
