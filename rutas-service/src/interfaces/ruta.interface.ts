// ruta.interface.ts
export interface RutaAPI {
  id: string;
  nombre_ruta: string;
  perfil_id: string;
  shape?: any; // puede ser un arreglo de coordenadas u otro formato
  calles_ids?: string[];
  created_at?: string;
  updated_at?: string;
}


