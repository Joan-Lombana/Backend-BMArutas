import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';

// Payload de posición en tiempo real
export type PosicionTiempoReal = {
  id: string;
  recorridoId: string;
  latitud: number;
  longitud: number;
  timestamp: number;
  velocidad?: number;
  sincronizadoOffline?: boolean;
  createdAt?: Date;
};


@WebSocketGateway({
  namespace: 'operativo',

  cors: {
    origin: '*',
  },
})
export class OperativoGateway
  implements
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect
{
  private readonly logger = new Logger(OperativoGateway.name);

  // Servidor WebSocket principal
  @WebSocketServer()
  servidor!: Server;

 
  // Gateway iniciado
  afterInit(server: Server) {
    this.logger.log('🚀 Gateway WebSocket operativo iniciado');
  }

  // Cliente conectado
  handleConnection(cliente: Socket) {
    this.logger.log(`🟢 Cliente conectado: ${cliente.id}`);
  }

  // Cliente desconectado
  handleDisconnect(cliente: Socket) {
    this.logger.log(`🔴 Cliente desconectado: ${cliente.id}`);
  }

  // Unirse a un recorrido
  @SubscribeMessage('unirseRecorrido')
  manejarUnionRecorrido(
    @MessageBody() recorridoId: string,
    @ConnectedSocket() cliente: Socket,
  ) {
    const sala = `recorrido:${recorridoId}`;

    cliente.join(sala);

    this.logger.log(
      `📍 Socket ${cliente.id} unido a sala ${sala}`,
    );

    return {
      evento: 'unido',
      recorridoId,
    };
  }
  emitirEstadoRecorrido(recorridoId: string, estado: string) {
  this.servidor
    .to(`recorrido:${recorridoId}`)
    .emit('recorrido.estado', {
      recorridoId,
      estado,
    });
}

  // Emitir eliminación de recorrido
  emitirRecorridoEliminado(recorridoId: string) {
    this.servidor
      .to(`recorrido:${recorridoId}`)
      .emit('recorrido.eliminado', {
        recorridoId,
      });
  }

  // Salir de un recorrido
  @SubscribeMessage('salirRecorrido')
  manejarSalidaRecorrido(
    @MessageBody() recorridoId: string,
    @ConnectedSocket() cliente: Socket,
  ) {
    const sala = `recorrido:${recorridoId}`;

    cliente.leave(sala);

    this.logger.log(
      `📤 Socket ${cliente.id} salió de sala ${sala}`,
    );

    return {
      evento: 'salio',
      recorridoId,
    };
  }

  // Emitir nueva posición
  emitirPosicion(recorridoId: string, posicion: PosicionTiempoReal) {
  this.servidor
    .to(`recorrido:${recorridoId}`)
    .emit('posicion', posicion);
}

  // Emitir actualización de posición
  emitirPosicionActualizada(
    recorridoId: string,
    posicion: PosicionTiempoReal,
  ) {
    this.servidor
      .to(`recorrido:${recorridoId}`)
      .emit('posicion.actualizada', posicion);
  }
}
