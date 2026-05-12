import { PartialType } from '@nestjs/mapped-types';
import { CreateEventorecorridoDto } from './create-eventorecorrido.dto';

export class UpdateEventorecorridoDto extends PartialType(CreateEventorecorridoDto) {}
