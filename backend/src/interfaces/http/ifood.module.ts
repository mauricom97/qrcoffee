import { Module } from '@nestjs/common';
import { IfoodController } from './ifood.controller';
import { IngestIfoodOrderUseCase } from '@application/ifood/use-cases/ingest-ifood-order.usecase';
import { CreateOrderUseCase } from '@application/order/use-cases/create-order.usecase';
import { OrderPrismaRepository } from '@infrastructure/order/repositories/order-prisma.repository';
import { IfoodApiClient } from '@infrastructure/ifood/ifood-api.client';
import { IfoodAuthService } from '@infrastructure/ifood/ifood-auth.service';
import { PrismaService } from '@infrastructure/prisma/prisma.service';
import { RealtimeModule } from '@interfaces/websocket/realtime.module';
import { PermissionsModule } from './permissions.module';

@Module({
  imports: [RealtimeModule, PermissionsModule],
  controllers: [IfoodController],
  providers: [
    PrismaService,
    IfoodApiClient,
    IfoodAuthService,
    {
      provide: 'OrderRepository',
      useClass: OrderPrismaRepository,
    },
    {
      provide: CreateOrderUseCase,
      useFactory: (repo: OrderPrismaRepository) => new CreateOrderUseCase(repo),
      inject: ['OrderRepository'],
    },
    {
      provide: IngestIfoodOrderUseCase,
      useFactory: (
        prisma: PrismaService,
        repo: OrderPrismaRepository,
        createOrder: CreateOrderUseCase,
        api: IfoodApiClient,
        auth: IfoodAuthService,
      ) => new IngestIfoodOrderUseCase(prisma, repo, createOrder, api, auth),
      inject: [PrismaService, 'OrderRepository', CreateOrderUseCase, IfoodApiClient, IfoodAuthService],
    },
  ],
})
export class IfoodModule {}
