// posicion.interface.ts
export interface PosicionAPI {
  id: string;
  recorrido_id: string;
  lat: number;
  lon: number;
  perfil_id: string;
  fecha?: string;
  created_at?: string;
  updated_at?: string;
}

