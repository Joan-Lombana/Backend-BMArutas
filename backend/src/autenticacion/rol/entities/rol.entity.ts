import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Perfil } from '../../perfil/entities/perfil.entity';


export enum TipoRol {
  ADMIN = 'admin',
  USUARIO = 'usuario',
}

@Entity('roles')
export class Rol {
  @PrimaryGeneratedColumn('uuid')
  id: string;


  // Tipo de rol (enum)
  @Column({
    type: 'enum',
    enum: TipoRol,
    default: TipoRol.USUARIO,
    
  })
  tipo: TipoRol;

  // Descripción opcional
  @Column({ nullable: true })
  descripcion?: string;

  // Relación 1:N con Perfil
  @OneToMany(() => Perfil, (perfil) => perfil.rol)
  perfiles: Perfil[];
}

