import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OperativoService } from './operativo.service';
import { OperativoController } from './operativo.controller';
import { OperativoGateway } from './operativo.gateway';
import { PosicionModule } from './posicion/posicion.module';
import { Recorrido } from './recorrido/entities/recorrido.entity';
import { EventorecorridoModule } from './eventorecorrido/eventorecorrido.module';
import { IncidenciaModule } from './incidencia/incidencia.module';

@Module({
  imports: [
    HttpModule,
    PosicionModule,
    TypeOrmModule.forFeature([Recorrido]),
    EventorecorridoModule,
    IncidenciaModule,
  ],
  controllers: [OperativoController],
  providers: [OperativoService, OperativoGateway],
  exports: [OperativoService],
})
export class OperativoModule {}
