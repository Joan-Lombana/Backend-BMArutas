export class CreatePerfilDto {
  usuarioId: string;
  rolId?: string;
  estado?: string;
  personalizacion?: Record<string, any>;
}