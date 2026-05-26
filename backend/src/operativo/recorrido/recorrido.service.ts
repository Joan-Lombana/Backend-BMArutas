import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { OperativoService } from '../operativo.service';
import { CreateRecorridoDto } from './dto/create-recorrido.dto';

import {
  Recorrido,
  EstadoRecorrido,
} from './entities/recorrido.entity';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioService } from 'src/autenticacion/usuario/usuario.service';
import { EventoRecorridoService } from '../eventorecorrido/eventorecorrido.service';

@Injectable()
export class RecorridoService {
  constructor(
    private readonly operativoService: OperativoService,
    private readonly eventoService: EventoRecorridoService,
    private readonly usuarioService: UsuarioService,

    @InjectRepository(Recorrido)
    private readonly recorridoRepo: Repository<Recorrido>,
  ) {}

  // =========================
  // CREAR
  // =========================

  async crear(dto: CreateRecorridoDto) {
    const recorrido = this.recorridoRepo.create({
      ruta_id: dto.ruta_id,
      vehiculo_id: dto.vehiculo_id,
      conductor_id: dto.conductor_id,
      fecha_programada: dto.fecha_programada,
      estado: EstadoRecorrido.PROGRAMADA,
    });

    const savedRecorrido =
      await this.recorridoRepo.save(recorrido);

    // ✅ Persistir evento
    await this.eventoService.registrarProgramado(
      savedRecorrido.id,
      {
        ruta_id: savedRecorrido.ruta_id,
        vehiculo_id: savedRecorrido.vehiculo_id,
        conductor_id: savedRecorrido.conductor_id,
      },
    );

    // 📡 Emitir WebSocket
    this.operativoService.emitirEstadoRecorrido(
      savedRecorrido.id,
      EstadoRecorrido.PROGRAMADA,
    );

    return savedRecorrido;
  }

  // =========================
  // OBTENER TODOS
  // =========================

  async obtenerTodos() {
    const recorridos = await this.recorridoRepo.find({
      order: { createdAt: 'DESC' },
    });

    // 🔹 TRAER RUTAS UNA SOLA VEZ
    let rutasMap = new Map();
    try {
      const rutasRes: any = await this.operativoService.obtenerRutas();
      const rutas = rutasRes?.data ?? [];
      rutasMap = new Map(rutas.map(r => [r.id, r]));
    } catch (error) {
      console.error('❌ Error obteniendo rutas');
    }

    // 🚗 Obtener vehículos del microservicio en bloque
    let vehiculosMap = new Map();
    try {
      const vehiculos: any = await this.operativoService.obtenerVehiculos();
      vehiculosMap = new Map(
        (Array.isArray(vehiculos) ? vehiculos : []).map((v: any) => [v.id, v]),
      );
    } catch (error) {
      console.error('⚠️ No se pudieron obtener detalles de vehículos:', error.message);
    }

    const recorridosEnriquecidos = await Promise.all(
      recorridos.map(async (recorrido) => {
        let conductor: any = null;

        // =========================
        // CONDUCTOR
        // =========================
        try {
          conductor = await this.usuarioService.findOne(recorrido.conductor_id);
        } catch (error) {
          console.error('❌ Error conductor:', recorrido.conductor_id);
        }

        return {
          ...recorrido,
          ruta: rutasMap.get(recorrido.ruta_id) || null,
          vehiculo: vehiculosMap.get(recorrido.vehiculo_id) || null,
          conductor: conductor || null,
        };
      }),
    );

    return recorridosEnriquecidos;
  }

  // =========================
  // OBTENER POR ID
  // =========================

  async obtenerPorId(id: string) {
    const recorrido =
      await this.recorridoRepo.findOne({
        where: { id },
      });

    if (!recorrido) {
      throw new NotFoundException(
        'Recorrido no encontrado',
      );
    }

    return recorrido;
  }


  // =========================
  // INICIAR
  // =========================

  async iniciar(id: string) {

    const recorrido =
      await this.obtenerPorId(id);

    // 🚫 NO permitir iniciar finalizados
    if (
      recorrido.estado ===
      EstadoRecorrido.FINALIZADO
    ) {
      throw new BadRequestException(
        'El recorrido ya fue finalizado',
      );
    }

    // 🚫 Evitar iniciar dos veces
    if (
      recorrido.estado ===
      EstadoRecorrido.ACTIVA
    ) {
      throw new BadRequestException(
        'El recorrido ya está activo',
      );
    }

    // 🚫 Solo programados o pausados
    if (
      ![
        EstadoRecorrido.PROGRAMADA,
        EstadoRecorrido.PAUSADO,
      ].includes(recorrido.estado)
    ) {
      throw new BadRequestException(
        'El recorrido no puede iniciarse desde su estado actual',
      );
    }

    try {
      // Solo llamar a la API externa la primera vez (cuando está Programada)
      // Si está en pausa, no volver a iniciar en la API externa.
      if (recorrido.estado === EstadoRecorrido.PROGRAMADA) {
        // 🔥 API EXTERNA
        const apiResponse =
          await this.operativoService.iniciarRecorrido({
            ruta_id: recorrido.ruta_id,
            vehiculo_id: recorrido.vehiculo_id,
          });

        console.log(
          '🌐 Respuesta API externa:',
          apiResponse,
        );

        // 🧠 Guardar ID externo
        if (apiResponse?.id) {
          recorrido.api_recorrido_id =
            apiResponse.id;
        }
      }

    } catch (error) {

      console.error(
        '❌ Error llamando API externa:',
        error,
      );

      // ✅ Persistir error
      await this.eventoService.registrar(
        recorrido.id,
        'ERROR_SINCRONIZACION' as any,
        {
          error:
            'No se pudo iniciar recorrido en API externa',
        },
      );

      throw new BadRequestException(
        'No se pudo iniciar el recorrido en la API externa',
      );
    }

    // ✅ Actualizar estado
    recorrido.estado =
      EstadoRecorrido.ACTIVA;

    const savedRecorrido =
      await this.recorridoRepo.save(recorrido);

    // ✅ Persistir evento
    await this.eventoService.registrarIniciado(
      savedRecorrido.id,
      {
        api_recorrido_id:
          savedRecorrido.api_recorrido_id,
      },
    );

    // 📡 Emitir WebSocket
    this.operativoService.emitirEstadoRecorrido(
      savedRecorrido.id,
      EstadoRecorrido.ACTIVA,
    );

    return savedRecorrido;
  }

  // =========================
  // PAUSAR
  // =========================

  async pausar(id: string) {

    const recorrido =
      await this.obtenerPorId(id);

    // 🚫 No pausar finalizados
    if (
      recorrido.estado ===
      EstadoRecorrido.FINALIZADO
    ) {
      throw new BadRequestException(
        'No se puede pausar un recorrido finalizado',
      );
    }

    // 🚫 Solo activos pueden pausarse
    if (
      recorrido.estado !==
      EstadoRecorrido.ACTIVA
    ) {
      throw new BadRequestException(
        'Solo recorridos activos pueden pausarse',
      );
    }

    recorrido.estado =
      EstadoRecorrido.PAUSADO;

    const savedRecorrido =
      await this.recorridoRepo.save(recorrido);

    // ✅ Persistir evento
    await this.eventoService.registrarPausado(
      savedRecorrido.id,
    );

    // 📡 Emitir WebSocket
    this.operativoService.emitirEstadoRecorrido(
      savedRecorrido.id,
      EstadoRecorrido.PAUSADO,
    );

    return savedRecorrido;
  }

  // =========================
  // FINALIZAR
  // =========================

  async finalizar(id: string) {

    const recorrido =
      await this.obtenerPorId(id);

    // 🚫 No finalizar dos veces
    if (
      recorrido.estado ===
      EstadoRecorrido.FINALIZADO
    ) {
      throw new BadRequestException(
        'El recorrido ya está finalizado',
      );
    }

    // 🚫 Solo activos o pausados
    if (
      ![
        EstadoRecorrido.ACTIVA,
        EstadoRecorrido.PAUSADO,
      ].includes(recorrido.estado)
    ) {
      throw new BadRequestException(
        'Solo recorridos activos o pausados pueden finalizarse',
      );
    }

    // 🚨 Debe existir sincronización externa
    if (!recorrido.api_recorrido_id) {

      throw new BadRequestException(
        'Este recorrido no está sincronizado con la API externa',
      );
    }

    try {

      // 🔥 API EXTERNA
      const apiResponse =
        await this.operativoService.finalizarRecorrido(
          recorrido.api_recorrido_id,
        );

      console.log(
        '🌐 Finalizado en API externa:',
        apiResponse,
      );

    } catch (error) {

      console.error(
        '❌ Error finalizando en API externa:',
        error,
      );

      // ✅ Persistir error
      await this.eventoService.registrar(
        recorrido.id,
        'ERROR_SINCRONIZACION' as any,
        {
          error:
            'No se pudo finalizar recorrido en API externa',
        },
      );

      throw new BadRequestException(
        'No se pudo finalizar el recorrido en la API externa',
      );
    }

    // ✅ Actualizar estado local
    recorrido.estado =
      EstadoRecorrido.FINALIZADO;

    const savedRecorrido =
      await this.recorridoRepo.save(recorrido);

    // ✅ Persistir evento
    await this.eventoService.registrarFinalizado(
      savedRecorrido.id,
    );

    // 📡 Emitir WebSocket
    this.operativoService.emitirEstadoRecorrido(
      savedRecorrido.id,
      EstadoRecorrido.FINALIZADO,
    );

    return savedRecorrido;
  }

  async eliminar(id: string) {
    const recorrido = await this.obtenerPorId(id);
    if (recorrido.estado !== EstadoRecorrido.PROGRAMADA) {
      throw new BadRequestException(
        'Solo se pueden eliminar recorridos PROGRAMADOS'
      );
    }
    await this.eventoService.registrarEliminado(recorrido.id);
    await this.recorridoRepo.remove(recorrido);
    this.operativoService.emitirRecorridoEliminado(id);

    return { message: 'Recorrido eliminado correctamente' };
  }
}