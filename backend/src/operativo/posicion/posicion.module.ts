import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PosicionService } from './posicion.service';
import { PosicionController } from './posicion.controller';
import { Posicion } from './entities/posicion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Posicion])],
  controllers: [PosicionController],
  providers: [PosicionService],
  exports: [PosicionService],
})
export class PosicionModule {}
