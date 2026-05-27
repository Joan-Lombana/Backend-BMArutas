import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Incidencia } from './entities/incidencia.entity';
import { IncidenciaService } from './incidencia.service';
import { IncidenciaController } from './incidencia.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Incidencia])],
  providers: [IncidenciaService],
  controllers: [IncidenciaController],
  exports: [IncidenciaService],
})
export class IncidenciaModule {}
