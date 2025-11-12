import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

// Entidades
import { Usuario } from './usuario/entities/usuario.entity';
import { Rol } from './rol/entities/rol.entity';
import { Perfil } from './perfil/entities/perfil.entity';

// Submódulos (si los tienes)
import { UsuarioModule } from './usuario/usuario.module';
import { RolModule } from './rol/rol.module';
import { PerfilModule } from './perfil/perfil.module';

// Controladores y servicios
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './strategies/google.strategy'; // o ./guards/google.strategy

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario, Rol, Perfil]),
    UsuarioModule,
    RolModule,
    PerfilModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'mi_super_clave_secreta', // 👈 puede venir del .env
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy],
  exports: [AuthService],
})
export class AuthModule {}

