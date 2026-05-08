import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Recorrido } from './entities/recorrido.entity';
import { RecorridoService } from './recorrido.service';

import { OperativoModule } from '../operativo.module';
import { RecorridoController } from './recorrido.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Recorrido]),
    forwardRef(() => OperativoModule), // 👈 para usar OperativoService
  ],
  controllers: [RecorridoController],
  providers: [RecorridoService],
})
export class RecorridoModule {}