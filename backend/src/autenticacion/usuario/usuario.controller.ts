import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Roles } from '../decoradores/roles.decorador';
import { RolesGuard } from '../guards/roles.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import {  UnauthorizedException } from '@nestjs/common';

@Controller('usuario')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioService.findOne(id);
  }

  @Patch(':id')
  @Roles('admin')
  update(@Param('id') id: string, @Body() data: any) {
    return this.usuarioService.update(id, data);
  }

  @Post('/crear')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin') // Solo usuarios con rol admin pueden acceder
  async create(@Body() createUsuarioDto: CreateUsuarioDto) {
    // Validación adicional: solo permitir crear con rol conductor
    if (createUsuarioDto.rol !== 'conductor') {
      throw new UnauthorizedException(
        'Solo se pueden crear usuarios con rol conductor',
      );
    }
    return this.usuarioService.create(createUsuarioDto);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.usuarioService.remove(id);
  }
}


