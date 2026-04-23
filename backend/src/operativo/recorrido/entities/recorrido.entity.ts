import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum EstadoRecorrido {
  NO_PROGRAMADA = 'No programada',
  PROGRAMADA = 'Programada',
  ACTIVA = 'Activa',
  PAUSADO = 'Pausado',
  FINALIZADO = 'Finalizado',
  CANCELADO = 'Cancelado',
}

@Entity()
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

  @Column({ nullable: true })
  api_recorrido_id?: string;
}