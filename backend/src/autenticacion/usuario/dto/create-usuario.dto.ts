import { IsString, IsEmail, IsEnum, IsOptional } from 'class-validator';
import { TipoRol } from '../../rol/entities/rol.entity';

export class CreateUsuarioDto {

  @IsString()
  primerNombre!: string;

  @IsOptional()
  segundoNombre?: string;

  @IsString()
  primerApellido!: string;

  @IsOptional()
  @IsString()
  segundoApellido?: string;

  @IsEmail()
  correo!: string;

  @IsString()
  password!: string;

  @IsEnum(TipoRol)
  rol!: TipoRol;

}
