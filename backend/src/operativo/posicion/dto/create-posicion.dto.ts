
import {
  IsNumber,
  IsString,
  IsOptional
} from 'class-validator';

export class CreatePosicionDto {

  @IsString()
  recorridoId!: string;

  @IsNumber()
  latitud!: number;

  @IsNumber()
  longitud!: number;

  @IsNumber()
  timestamp!: number;

  @IsOptional()
  @IsNumber()
  velocidad?: number;
}