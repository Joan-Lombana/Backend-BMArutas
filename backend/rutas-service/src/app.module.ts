import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { ApilucioModule } from './apilucio/apilucio.module';


@Module({
  imports: [HttpModule, ApilucioModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
