import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario])],  // 👈 OBLIGATORIO
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports: [UsuarioService], // opcional pero recomendado
})
export class UsuarioModule {}
