import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Recorrido } from '../../recorrido/entities/recorrido.entity';

export enum TipoEventoRecorrido {
  PROGRAMADO = 'PROGRAMADO',
  INICIADO = 'INICIADO',
  PAUSADO = 'PAUSADO',
  FINALIZADO = 'FINALIZADO',
  ELIMINADO = 'ELIMINADO',
  POSICION_RECIBIDA = 'POSICION_RECIBIDA',
  ERROR_SINCRONIZACION = 'ERROR_SINCRONIZACION',
}

@Entity('eventos_recorrido')
export class EventoRecorrido {

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'enum',
    enum: TipoEventoRecorrido,
  })
  tipo!: TipoEventoRecorrido;

  @Column({
    type: 'jsonb',
    nullable: true,
  })
  payload?: any;

  @CreateDateColumn()
  createdAt!   : Date;

  @ManyToOne(() => Recorrido, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'recorrido_id',
  })
  recorrido!: Recorrido;

  @Column()
  recorrido_id!: string;

  
}
