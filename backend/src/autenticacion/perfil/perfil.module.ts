import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Perfil } from './entities/perfil.entity';
import { Usuario } from '../usuario/entities/usuario.entity';
import { Rol } from '../rol/entities/rol.entity';

import { PerfilService } from './perfil.service';
import { PerfilController } from './perfil.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Perfil,
      Usuario,
      Rol,
    ]),
  ],
  controllers: [PerfilController],
  providers: [PerfilService],
  exports: [PerfilService],
})
export class PerfilModule {}