import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Backend principal de Ecoruta funcionando correctamente 🚀';
  }
}

