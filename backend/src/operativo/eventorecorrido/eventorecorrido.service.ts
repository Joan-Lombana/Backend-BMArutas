import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  EventoRecorrido,
  TipoEventoRecorrido,
} from './entities/eventorecorrido.entity';

@Injectable()
export class EventoRecorridoService {
  constructor(
    @InjectRepository(EventoRecorrido)
    private readonly repo: Repository<EventoRecorrido>,
  ) {}

  // =========================
  // REGISTRAR EVENTO
  // =========================

  async registrar(
    recorridoId: string,
    tipo: TipoEventoRecorrido,
    payload?: any,
  ) {
    const evento = this.repo.create({
      recorrido_id: recorridoId,
      tipo,
      payload: payload ?? null,
    });

    return this.repo.save(evento);
  }

  // =========================
  // OBTENER EVENTOS
  // =========================

  async obtenerPorRecorrido(
    recorridoId: string,
  ) {
    return this.repo.find({
      where: {
        recorrido_id: recorridoId,
      },
      order: {
        createdAt: 'ASC',
      },
    });
  }

  // =========================
  // HELPERS DE NEGOCIO
  // =========================

  async registrarProgramado(
    recorridoId: string,
    payload?: any,
  ) {
    return this.registrar(
      recorridoId,
      TipoEventoRecorrido.PROGRAMADO,
      payload,
    );
  }

  async registrarIniciado(
    recorridoId: string,
    payload?: any,
  ) {
    return this.registrar(
      recorridoId,
      TipoEventoRecorrido. INICIADO,
      payload,
    );
  }

  async registrarPausado(
    recorridoId: string,
    payload?: any,
  ) {
    return this.registrar(
      recorridoId,
      TipoEventoRecorrido.PAUSADO,
      payload,
    );
  }

  async registrarFinalizado(
    recorridoId: string,
    payload?: any,
  ) {
    return this.registrar(
      recorridoId,
      TipoEventoRecorrido.FINALIZADO,
      payload,
    );
  }

  async registrarEliminado(
    recorridoId: string,
    payload?: any,
  ) {
    return this.registrar(
      recorridoId,
      TipoEventoRecorrido.ELIMINADO,
      payload,
    );
  }

  async registrarPosicionCreada(
    recorridoId: string,
    payload?: any,
  ) {
    return this.registrar(
      recorridoId,
      TipoEventoRecorrido.POSICION_RECIBIDA,
      payload,
    );
  }
 
  async registrarErrorSincronizacion(
    recorridoId: string,
    payload?: Record<string, any>,
  ) {
    return this.registrar(
      recorridoId,
      TipoEventoRecorrido.ERROR_SINCRONIZACION,
      payload,
    );
  }
}
