import { CalleAPI } from './calle.interface';
import { HorarioAPI } from './horario.interface';

export interface RutaAPI {
  id: number;
  nombre: string;
  descripcion?: string;
  origen?: string;
  destino?: string;
  distancia?: number;
  activo?: boolean;
  calles?: CalleAPI[];
  horarios?: HorarioAPI[];
  created_at?: string;
  updated_at?: string;
}

