import { Test, TestingModule } from '@nestjs/testing';
import { EventorecorridoService } from './eventorecorrido.service';

describe('EventorecorridoService', () => {
  let service: EventorecorridoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventorecorridoService],
    }).compile();

    service = module.get<EventorecorridoService>(EventorecorridoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
