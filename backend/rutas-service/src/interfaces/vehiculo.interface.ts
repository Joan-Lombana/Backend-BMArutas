export interface VehiculoAPI {
  id: number;
  placa: string;
  modelo: string;
  marca: string;
  capacidad: number;
  tipo: string;
  activo: boolean;
  created_at?: string;
  updated_at?: string;
}
