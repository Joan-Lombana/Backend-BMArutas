// recorrido.interface.ts
export interface RecorridoAPI {
  id: string;
  ruta_id: string;
  vehiculo_id: string;
  perfil_id: string;
  estado?: 'iniciado' | 'finalizado';
  fecha_inicio?: string;
  fecha_fin?: string;
  created_at?: string;
  updated_at?: string;
}

