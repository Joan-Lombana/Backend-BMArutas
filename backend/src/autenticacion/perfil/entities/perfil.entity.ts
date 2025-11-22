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
  id: string;

  @Column({ length: 20, default: 'activo' })
  estado: string;

  @Column({ type: 'jsonb', nullable: true })
  personalizacion: Record<string, any>;

  @OneToOne(() => Usuario, (usuario) => usuario.perfil, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @ManyToOne(() => Rol, (rol) => rol.perfiles, {
    nullable: true, // 👈 IMPORTANTE
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'rol_id' })
  rol: Rol | null;
}



