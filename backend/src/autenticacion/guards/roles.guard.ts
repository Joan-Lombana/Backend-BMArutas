import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decoradores/roles.decorador';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()]
    );

    if (!requiredRoles) {
      // Si la ruta no exige roles → permitir acceso
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user; // Este usuario viene del JWT

    // SACAR EL ROL DE FORMA SEGURA
    const tipoRol = user?.perfil?.rol?.tipo ?? null;

    // Si no tiene rol → bloquear
    if (!tipoRol) return false;

    // Validar si el rol coincide con los requeridos
    return requiredRoles.includes(tipoRol);
  }
}

