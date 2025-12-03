// dto/crear-posicion.dto.ts
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CrearPosicionDto {
  @IsString()
  recorrido_id: string;

  @IsNumber()
  lat: number;

  @IsNumber()
  lon: number;

  @IsString()
  perfil_id: string;

  @IsOptional()
  @IsString()
  fecha?: string;
}