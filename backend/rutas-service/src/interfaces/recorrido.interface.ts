export interface RecorridoAPI {
  id: number;
  ruta_id: number;
  vehiculo_id: number;
  conductor_id?: number;
  fecha_inicio: string;
  fecha_fin?: string;
  estado: 'en_progreso' | 'finalizado' | 'pendiente';
  created_at?: string;
  updated_at?: string;
}
