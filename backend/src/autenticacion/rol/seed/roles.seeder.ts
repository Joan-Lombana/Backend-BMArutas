import { AppDataSource } from '../../../../data-source';
import { Rol, TipoRol } from '../entities/rol.entity';

async function seedRoles() {
  console.log('🚀 Seeder iniciado...');

  try {
    await AppDataSource.initialize();
    console.log('🔌 Conexión establecida');

    const repo = AppDataSource.getRepository(Rol);

    const roles = [
      { tipo: TipoRol.ADMIN, descripcion: 'Super usuario con acceso completo' },
      { tipo: TipoRol.CONDUCTOR, descripcion: 'Usuario con rol de conductor' },
    ];

    for (const r of roles) {
      const existe = await repo.findOne({
        where: { tipo: r.tipo },
      });

      if (!existe) {
        const nuevo = repo.create(r);
        await repo.save(nuevo);
        console.log('✅ Rol creado:', r.tipo);
      } else {
        console.log('⚠ Ya existe:', r.tipo);
      }
    }

  } catch (error) {
    console.error('❌ Error en el seeder:', error);
  } finally {
    await AppDataSource.destroy();
    console.log('🔚 Conexión cerrada.');
  }
}

seedRoles();
