export type EstadoRecorrido =
  | 'pendiente' //  creado pero no se ha asignado a un conductor o vehículo
  | 'asignado' // El recorrido ha sido asignado a un conductor y vehículo, pero aún no ha comenzado
  | 'iniciado' // El conductor ha comenzado el recorrido
  | 'pausado' // El conductor ha pausado el recorrido (por ejemplo, por una pausa o imprevisto)
  | 'finalizado' // El conductor ha completado el recorrido
  | 'cancelado';

export interface RecorridoAPI {
  id: string;
  ruta_id: string;
  vehiculo_id: string;
  id_conductor: string; // 👈 TU sistema
  perfil_id: string;    // 👈 API externa
  estado: EstadoRecorrido;
  fecha_inicio?: string;
  fecha_fin?: string;

}

