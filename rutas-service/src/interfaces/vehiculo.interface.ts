export interface VehiculoAPI {
  id: string;
  placa: string;
  modelo: string;
  marca: string;
  capacidad: number;
  tipo: string;
  activo: boolean;
  created_at?: string;
  updated_at?: string;
  perfil_id: string
}
