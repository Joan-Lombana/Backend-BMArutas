
import { IsString, IsOptional, IsNumber } from 'class-validator';

export class RegistrarCalleDto {
  @IsString()
  nombre: string;

  @IsOptional()
  @IsNumber()
  longitud?: number;

  @IsOptional()
  @IsString()
  codigo?: string;

  @IsOptional()
  @IsNumber()
  barrio_id?: number;
}