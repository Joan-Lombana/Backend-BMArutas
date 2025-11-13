import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Usuario } from 'src/autenticacion/usuario/entities/usuario.entity';
import { Rol } from 'src/autenticacion/rol/entities/rol.entity';

@Entity('perfiles')
export class Perfil {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  // Estado del perfil: activo, inactivo, suspendido, etc.
  @Column({ length: 20, default: 'activo' })
  estado: string;

  // Configuración personalizada del usuario (colores, idioma, etc.)
  @Column({ type: 'jsonb', nullable: true })
  personalizacion: Record<string, any>;

  // Relación 1:1 con Usuario → un usuario tiene un solo perfil
  @OneToOne(() => Usuario, (usuario) => usuario.perfil, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'usuario_id' }) // crea la FK en esta tabla
  usuario: Usuario;

  // Relación N:1 con Rol → muchos perfiles pueden tener el mismo rol
  @ManyToOne(() => Rol, (rol) => rol.perfiles, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'rol_id' }) // crea la FK en esta tabla
  rol: Rol;
}


