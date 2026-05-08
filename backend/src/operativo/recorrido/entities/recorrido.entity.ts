import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from 'typeorm';

import { Posicion } from 'src/operativo/posicion/entities/posicion.entity';

export enum EstadoRecorrido {
  NO_PROGRAMADA = 'No programada',
  PROGRAMADA = 'Programada',
  ACTIVA = 'Activa',
  PAUSADO = 'Pausado',
  FINALIZADO = 'Finalizado',
  CANCELADO = 'Cancelado',
}

@Entity('recorridos')
export class Recorrido {

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  ruta_id!: string;

  @Column()
  vehiculo_id!: string;

  @Column()
  conductor_id!: string;

  @Column({
    type: 'enum',
    enum: EstadoRecorrido,
    default: EstadoRecorrido.NO_PROGRAMADA,
  })
  estado!: EstadoRecorrido;

  @Column({
    nullable: true
  })
  api_recorrido_id?: string;

  @Column({
    nullable: true,
    type: 'timestamp'
  })
  fecha_inicio?: Date;

  @Column({
    nullable: true,
    type: 'timestamp'
  })
  fecha_fin?: Date;

  @OneToMany(
    () => Posicion,
    posicion => posicion.recorrido
  )
  posiciones!: Posicion[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}