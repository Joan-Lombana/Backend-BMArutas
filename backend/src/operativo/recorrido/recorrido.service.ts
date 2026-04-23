import { Injectable, NotFoundException, BadRequestException} from '@nestjs/common';
import { OperativoService } from '../operativo.service';
import { CreateRecorridoDto } from './dto/create-recorrido.dto';
import { Recorrido, EstadoRecorrido } from './entities/recorrido.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RecorridoService {
  constructor(
    private readonly operativoService: OperativoService,
    @InjectRepository(Recorrido)
    private readonly recorridoRepo: Repository<Recorrido>,
  ) {}

    async crear(dto: CreateRecorridoDto) {
   

    const recorrido = this.recorridoRepo.create({
      ruta_id: dto.ruta_id,
      vehiculo_id: dto.vehiculo_id,
      conductor_id: dto.conductor_id,
      estado: EstadoRecorrido.PROGRAMADA,
    });

    return await this.recorridoRepo.save(recorrido);
  }

  async obtenerTodos() {
    return this.recorridoRepo.find();
  }

  async obtenerPorId(id: string) {
    const recorrido = await this.recorridoRepo.findOne({ where: { id } });

    if (!recorrido) {
      throw new NotFoundException('Recorrido no encontrado');
    }

    return recorrido;
  }

  async iniciar(id: string) {
  const recorrido = await this.obtenerPorId(id);
  // 🚫 Evitar iniciar dos veces
  if (recorrido.estado === EstadoRecorrido.ACTIVA) {
    throw new Error('El recorrido ya está activo');
  }
  try {
    // 🔥 LLAMADA A LA API EXTERNA
    const apiResponse = await this.operativoService.iniciarRecorrido({
      ruta_id: recorrido.ruta_id,
      vehiculo_id: recorrido.vehiculo_id,
    });
    console.log('🌐 Respuesta API externa:', apiResponse);
    // 🧠 guarda el id externo si existe
    if (apiResponse?.id) {
      recorrido.api_recorrido_id = apiResponse.id;
    }
  } catch (error) {
    console.error('❌ Error llamando API externa:', error);
    throw new Error('No se pudo iniciar el recorrido en la API externa');
  }
  // ✅ Actualizas estado local
  recorrido.estado = EstadoRecorrido.ACTIVA;
  return this.recorridoRepo.save(recorrido);
}

  async pausar(id: string) {
    const recorrido = await this.obtenerPorId(id);
    recorrido.estado = EstadoRecorrido.PAUSADO;
    return this.recorridoRepo.save(recorrido);
  }

  async finalizar(id: string) {
  const recorrido = await this.obtenerPorId(id);

  // 🚨 Validación clave
  if (!recorrido.api_recorrido_id) {
    throw new Error('Este recorrido no está sincronizado con la API externa');
  }

  try {
    // 🔥 LLAMADA A LA API EXTERNA
    const apiResponse = await this.operativoService.finalizarRecorrido(
      recorrido.api_recorrido_id
    );

    console.log('🌐 Finalizado en API externa:', apiResponse);

  } catch (error) {
    console.error('❌ Error finalizando en API externa:', error);
    throw new Error('No se pudo finalizar el recorrido en la API externa');
  }

  // ✅ Actualizas estado local SOLO si todo salió bien
  recorrido.estado = EstadoRecorrido.FINALIZADO;

  return this.recorridoRepo.save(recorrido);
}

  async eliminar(id: string) {
  const recorrido = await this.obtenerPorId(id);

  // 🚨 Validación de negocio
  if (recorrido.estado !== EstadoRecorrido.PROGRAMADA) {
  throw new BadRequestException(
    'Solo se pueden eliminar recorridos en estado PROGRAMADA'
  );
 }

  return this.recorridoRepo.remove(recorrido);
}
}