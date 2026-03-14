import { Module } from '@nestjs/common';
import { ComandaController } from './comanda.controller';
import { OrderModule } from './order.module';

@Module({
  imports: [OrderModule],
  controllers: [ComandaController],
})
export class ComandaModule {}
