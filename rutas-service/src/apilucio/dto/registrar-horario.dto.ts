
import { IsString, IsOptional } from 'class-validator';

export class RegistrarHorarioDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsString()
  hora_inicio: string; // formato "HH:mm"

  @IsString()
  hora_fin: string;

  @IsOptional()
  @IsString()
  ruta_id?: string;
}