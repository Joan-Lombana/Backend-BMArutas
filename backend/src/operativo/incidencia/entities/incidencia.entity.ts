import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Recorrido } from '../../recorrido/entities/recorrido.entity';

@Entity('incidencia')
export class Incidencia {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'recorrido_id', nullable: true })
  recorrido_id: string;

  @ManyToOne(() => Recorrido, { nullable: true })
  @JoinColumn({ name: 'recorrido_id' })
  recorrido: Recorrido;

  @Column()
  tipo: string;

  @Column({ type: 'text' })
  descripcion: string;

  @Column({ type: 'text', nullable: true })
  foto: string;

  @Column({ type: 'bigint', nullable: true })
  timestamp: number;

  @CreateDateColumn()
  createdAt: Date;
}
