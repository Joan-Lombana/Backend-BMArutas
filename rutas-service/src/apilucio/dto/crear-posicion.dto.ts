// dto/crear-posicion.dto.ts
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CrearPosicionDto {
  @IsOptional()
  @IsString()
  recorrido_id?: string;

  @IsNumber()
  lat?: number;

  @IsNumber()
  lon?: number;

  @IsOptional()
  @IsString()
  perfil_id?: string;

  @IsOptional()
  @IsString()
  fecha?: string;
}