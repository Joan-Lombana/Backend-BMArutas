import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OperativoService } from './operativo.service';
import { OperativoController } from './operativo.controller';
import { OperativoGateway } from './operativo.gateway';
import { PosicionModule } from './posicion/posicion.module';
import { Recorrido } from './recorrido/entities/recorrido.entity';

@Module({
  imports: [HttpModule, PosicionModule, TypeOrmModule.forFeature([Recorrido])],
  controllers: [OperativoController],
  providers: [OperativoService, OperativoGateway],
  exports: [OperativoService],
})
export class OperativoModule {}
