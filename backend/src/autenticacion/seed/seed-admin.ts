import { AppDataSource } from 'data-source';
import * as bcrypt from 'bcrypt';

import { Usuario } from '../usuario/entities/usuario.entity';
import { Perfil } from '../perfil/entities/perfil.entity';
import { Rol, TipoRol } from '../rol/entities/rol.entity';

async function seedAdmin() {
  console.log('🚀 Seeder admin iniciado...');

  try {
    await AppDataSource.initialize();

    const usuarioRepo = AppDataSource.getRepository(Usuario);
    const perfilRepo = AppDataSource.getRepository(Perfil);
    const rolRepo = AppDataSource.getRepository(Rol);

    // =========================
    // buscar rol admin
    // =========================

    const rolAdmin = await rolRepo.findOne({
      where: { tipo: TipoRol.ADMIN },
    });

    console.log("ROL ADMIN:", rolAdmin);

    if (!rolAdmin) {
      console.log('❌ No existe rol ADMIN, ejecuta seed-roles primero');
      return;
    }

    // =========================
    // verificar admin
    // =========================

    const existe = await usuarioRepo.findOne({
      where: { correo: 'admin@admin.com' },
    });

    if (existe) {
      console.log('ℹ️ Admin ya existe');
      return;
    }

    // =========================
    // crear usuario
    // =========================
    const admin = usuarioRepo.create({
    primerNombre: 'Admin',
    primerApellido: 'Principal',
    segundoApellido: 'Sistema',
    correo: 'admin@admin.com',
    password: await bcrypt.hash('123456', 10),
    activo: true,
  });
  await usuarioRepo.save(admin)

    // =========================
    // crear perfil
    // =========================

    const perfil = perfilRepo.create({
      estado: 'activo',
      personalizacion: {},
      usuario: admin,
      rol: rolAdmin,
    });

    await perfilRepo.save(perfil);
    
    console.log('✅ Admin creado');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await AppDataSource.destroy();
  }
}

seedAdmin();