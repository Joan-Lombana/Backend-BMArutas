import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany} from 'typeorm';
import { Usuario } from 'src/autenticacion/usuario/entities/usuario.entity';
import { Rol } from 'src/autenticacion/rol/entities/rol.entity';

@Entity('perfiles')
export class Perfil {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20, default: 'activo' })
  estado: string;

  @Column({ type: 'jsonb', nullable: true })
  personalizacion: Record<string, any>;

  @OneToOne(() => Usuario, usuario => usuario.perfil)
  usuario: Usuario;

  @OneToMany(() => Rol, rol => rol.perfiles)
  rol: Rol;
}

