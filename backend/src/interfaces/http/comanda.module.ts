import { Module } from '@nestjs/common';
import { ComandaController } from './comanda.controller';
import { OrderModule } from './order.module';
import { RealtimeModule } from '@interfaces/websocket/realtime.module';

@Module({
  imports: [OrderModule, RealtimeModule],
  controllers: [ComandaController],
})
export class ComandaModule {}
