import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne
} from 'typeorm';

import { Recorrido } from '../../recorrido/entities/recorrido.entity';

@Entity('posiciones')
export class Posicion {

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  recorridoId!: string;

  @ManyToOne(
    () => Recorrido,
    recorrido => recorrido.posiciones,
    {
      onDelete: 'CASCADE'
    }
  )
  recorrido!: Recorrido;

  @Column('decimal', {
    precision: 10,
    scale: 7
  })
  latitud!: number;

  @Column('decimal', {
    precision: 10,
    scale: 7
  })
  longitud!: number;

  @Column({
    type: 'bigint'
  })
  timestamp!: number;

  @Column({
    type: 'float',
    nullable: true
  })
  velocidad!: number;

  @Column({
    default: false
  })
  sincronizadoOffline!: boolean;

  @CreateDateColumn()
  createdAt!: Date;
}

