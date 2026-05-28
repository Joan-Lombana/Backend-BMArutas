import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CrearIncidenciaDto {
  @IsString()
  tipo: string;

  @IsString()
  descripcion: string;

  @IsOptional()
  @IsString()
  foto?: string;

  @IsOptional()
  @IsNumber()
  timestamp?: number;
}
