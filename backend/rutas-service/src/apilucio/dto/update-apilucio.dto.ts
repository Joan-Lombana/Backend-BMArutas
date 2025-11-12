import { PartialType } from '@nestjs/mapped-types';
import { CreateApilucioDto } from './create-apilucio.dto';

export class UpdateApilucioDto extends PartialType(CreateApilucioDto) {}
