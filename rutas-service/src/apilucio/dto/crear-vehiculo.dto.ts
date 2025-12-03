// dto/crear-vehiculo.dto.ts
import { IsString, IsInt, IsBoolean, IsOptional } from 'class-validator';

export class CrearVehiculoDto {
  @IsString()
  placa: string;

  @IsOptional()
  @IsString()
  modelo?: string;

  @IsOptional()
  @IsString()
  marca?: string;

  @IsInt()
  capacidad: number;

  @IsString()
  tipo: string;

  @IsBoolean()
  activo: boolean;

  @IsString()
  perfil_id: string;
}
