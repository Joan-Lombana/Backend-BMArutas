import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EventoRecorridoController } from './eventorecorrido.controller';
import { EventoRecorridoService } from './eventorecorrido.service';

import { EventoRecorrido } from './entities/eventorecorrido.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([EventoRecorrido]),
  ],
  controllers: [EventoRecorridoController],
  providers: [EventoRecorridoService],
  exports: [EventoRecorridoService],
})
export class EventorecorridoModule {}
