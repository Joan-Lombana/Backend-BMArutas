export interface PosicionAPI {
  id: number;
  recorrido_id: number;
  latitud: number;
  longitud: number;
  velocidad?: number;
  timestamp: string; // Fecha/hora del punto GPS
  created_at?: string;
  updated_at?: string;
}
