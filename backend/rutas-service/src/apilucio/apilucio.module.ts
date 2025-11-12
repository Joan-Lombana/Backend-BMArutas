import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ApilucioController } from './apilucio.controller';
import { ApilucioService } from './apilucio.service';

@Module({
  imports: [HttpModule],
  controllers: [ApilucioController],
  providers: [ApilucioService],
  exports: [ApilucioService],
})
export class ApilucioModule {}
