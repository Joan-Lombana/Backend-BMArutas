import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { Perfil } from 'src/autenticacion/perfil/entities/perfil.entity';


@Entity('usuarios')
export class Usuario {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  primerNombre: string;

  @Column({ nullable: true })
  segundoNombre?: string; // ✅ opcional

  @Column()
  primerApellido: string;

  @Column()
  segundoApellido: string;

  @Column({ unique: true })
  correo: string;

  @Column({ select: false })
  password: string;

  @Column({ length: 15, nullable: true })
  numero_celular?: string; // ✅ opcional

  @Column({ default: true })
  activo: boolean;

  @OneToOne(() => Perfil, perfil => perfil.usuario)
  perfil: Perfil;
}


