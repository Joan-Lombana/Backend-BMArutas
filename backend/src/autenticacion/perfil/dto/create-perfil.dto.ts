import { IsUUID, IsOptional, IsString, IsObject } from 'class-validator';

export class CreatePerfilDto {

  @IsUUID()
  usuarioId!: string;

  @IsOptional()
  @IsUUID()
  rolId?: string;

  @IsOptional()
  @IsString()
  estado?: string;

  @IsOptional()
  @IsObject()
  personalizacion?: Record<string, any>;

}