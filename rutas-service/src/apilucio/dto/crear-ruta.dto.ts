// dto/crear-ruta.dto.ts
import { IsString, IsOptional, IsArray } from 'class-validator';

export class CrearRutaDto {
  @IsString()
  nombre_ruta: string;

  @IsString()
  perfil_id: string;

  @IsOptional()
  shape?: any; // aquí puedes definir un DTO más específico si lo necesitas

  @IsOptional()
  @IsArray()
  calles_ids?: string[];
}