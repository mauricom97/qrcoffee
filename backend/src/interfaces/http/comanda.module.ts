import { Module } from '@nestjs/common';
import { ComandaController } from './comanda.controller';
import { OrderModule } from './order.module';
import { RealtimeModule } from '@interfaces/websocket/realtime.module';
import { PermissionsModule } from './permissions.module';

@Module({
  imports: [OrderModule, RealtimeModule, PermissionsModule],
  controllers: [ComandaController],
})
export class ComandaModule {}
