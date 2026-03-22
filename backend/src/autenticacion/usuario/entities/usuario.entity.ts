import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Perfil } from 'src/autenticacion/perfil/entities/perfil.entity';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  primerNombre: string;

  @Column({ nullable: true })
  segundoNombre?: string;

  @Column()
  primerApellido: string;

  @Column()
  segundoApellido: string;

  @Column({ unique: true })
  correo: string;

  @Column({ select: false })
  password: string;

  @Column({ length: 15, nullable: true })
  numero_celular?: string;

  @Column({ default: true })
  activo: boolean;

  // 🔹 Perfil del usuario, carga automática (eager)
  @OneToOne(() => Perfil, perfil => perfil.usuario, { eager: true })
  perfil: Perfil;
}


