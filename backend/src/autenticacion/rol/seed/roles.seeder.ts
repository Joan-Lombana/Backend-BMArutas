import { AppDataSource } from '../../../../data-source';
import { Rol, TipoRol } from '../entities/rol.entity';

async function seedRoles() {
  console.log('🚀 Seeder iniciado...');
  try {
    await AppDataSource.initialize();
    console.log('🔌 Conexión establecida');

    const repo = AppDataSource.getRepository(Rol);
    const count = await repo.count();
    console.log(`📊 Roles existentes: ${count}`);

    if (count > 0) {
      console.log('ℹ️ Seeder omitido: ya hay roles.');
      return;
    }

    const roles = [
      repo.create({ tipo: TipoRol.ADMIN, descripcion: 'Super usuario con acceso completo' }),
      repo.create({ tipo: TipoRol.USUARIO, descripcion: 'Usuario regular' }),
    ];

    console.log('📦 Objetos creados:', roles);

    const result = await repo.save(roles);
    console.log('✅ Resultado de save():', result);
  } catch (error) {
    console.error('❌ Error en el seeder:', error);
  } finally {
    await AppDataSource.destroy();
    console.log('🔚 Conexión cerrada.');
  }
}

seedRoles();
