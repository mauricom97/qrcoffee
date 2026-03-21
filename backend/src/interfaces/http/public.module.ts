import { Module } from '@nestjs/common';
import { PublicController } from './public.controller';
import { PrismaService } from '@infrastructure/prisma/prisma.service';
import { OrderModule } from './order.module';
import { RealtimeModule } from '@interfaces/websocket/realtime.module';

@Module({
  imports: [OrderModule, RealtimeModule],
  controllers: [PublicController],
  providers: [PrismaService],
})
export class PublicModule {}
