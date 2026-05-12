import {
  Controller,
  Get,
  Param,
} from '@nestjs/common';

import { EventoRecorridoService } from './eventorecorrido.service';

@Controller('eventos-recorrido')
export class EventoRecorridoController {
  constructor(
    private readonly eventoService: EventoRecorridoService,
  ) {}

  // OBTENER EVENTOS DE UN RECORRIDO
  @Get(':recorridoId')
  async obtenerEventos(
    @Param('recorridoId')
    recorridoId: string,
  ) {
    return this.eventoService.obtenerPorRecorrido(
      recorridoId,
    );
  }
}
