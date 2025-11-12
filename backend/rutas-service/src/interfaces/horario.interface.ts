export interface HorarioAPI {
  id: number;
  ruta_id: number;
  dia: string; // Ej: "Lunes"
  hora_inicio: string; // Ej: "06:00:00"
  hora_fin: string; // Ej: "14:00:00"
  created_at?: string;
  updated_at?: string;
}
