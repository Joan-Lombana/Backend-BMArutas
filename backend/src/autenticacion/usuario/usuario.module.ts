// usuario.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { Usuario } from './entities/usuario.entity';
import { Perfil } from '../perfil/entities/perfil.entity';
import { Rol } from '../rol/entities/rol.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Perfil, Rol])],
  controllers: [UsuarioController],
  providers: [UsuarioService],
})
export class UsuarioModule {}
