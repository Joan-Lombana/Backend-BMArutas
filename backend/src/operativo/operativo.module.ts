import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { OperativoService } from './operativo.service';
import { OperativoController } from './operativo.controller';

@Module({
  imports: [HttpModule],
  controllers: [OperativoController],
  providers: [OperativoService],
})
export class OperativoModule {}
