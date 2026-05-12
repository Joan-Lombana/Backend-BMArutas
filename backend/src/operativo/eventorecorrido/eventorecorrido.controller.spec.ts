import { Test, TestingModule } from '@nestjs/testing';
import { EventorecorridoController } from './eventorecorrido.controller';
import { EventorecorridoService } from './eventorecorrido.service';

describe('EventorecorridoController', () => {
  let controller: EventorecorridoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventorecorridoController],
      providers: [EventorecorridoService],
    }).compile();

    controller = module.get<EventorecorridoController>(EventorecorridoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
