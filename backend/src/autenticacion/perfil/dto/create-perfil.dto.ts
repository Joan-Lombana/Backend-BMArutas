export class CreatePerfilDto {
  estado?: string;
  personalizacion?: Record<string, any>;
  rolId: number; // 👈 ID del rol que se asignará
}