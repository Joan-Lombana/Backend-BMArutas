// horario.interface.ts
export interface HorarioAPI {
  id: string;
  nombre?: string;
  hora_inicio?: string; // ej: "08:00"
  hora_fin?: string;    // ej: "17:00"
  ruta_id?: string;
  created_at?: string;
  updated_at?: string;
}

