import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { Perfil } from 'src/autenticacion/perfil/entities/perfil.entity';


@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 100, nullable: true })
  apellido: string;

  @Column({ unique: true })
  correo: string;

  @Column({ length: 15, nullable: true })
  numero_celular: string;

  @Column({ nullable: true })
  foto: string;

  @Column({ default: true })
  activo: boolean;

  @OneToOne(() => Perfil, perfil => perfil.usuario, { cascade: true })
  @JoinColumn()
  perfil: Perfil;
}


