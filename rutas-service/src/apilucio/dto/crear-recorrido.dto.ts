// dto/crear-recorrido.dto.ts
import { IsString, IsOptional, IsIn } from 'class-validator';

export class CrearRecorridoDto {
  @IsString()
  ruta_id: string;

  @IsString()
  vehiculo_id: string;

  @IsString()
  perfil_id: string;

  @IsOptional()
  @IsIn(['iniciado', 'finalizado'])
  estado?: 'iniciado' | 'finalizado';

  @IsOptional()
  @IsString()
  fecha_inicio?: string;

  @IsOptional()
  @IsString()
  fecha_fin?: string;
}