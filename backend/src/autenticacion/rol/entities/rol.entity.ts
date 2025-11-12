import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Perfil } from 'src/autenticacion/perfil/entities/perfil.entity'; 


@Entity('roles')
export class Rol {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  tipo: string;

  @OneToMany(() => Perfil, perfil => perfil.rol)
  perfiles: Perfil[];
}
