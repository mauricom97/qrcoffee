import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { CreateOrderUseCase } from '@application/order/use-cases/create-order.usecase';
import { FindAllOrderUseCase } from '@application/order/use-cases/find-order.usecase';
import { FindOneOrderUseCase } from '@application/order/use-cases/find-one-order.usecase';
import { UpdateOrderUseCase } from '@application/order/use-cases/update-order.usecase';
import { DeleteOrderUseCase } from '@application/order/use-cases/delete-order.usecase';
import { OrderPrismaRepository } from '@infrastructure/order/repositories/order-prisma.repository';
import { PrismaService } from '@infrastructure/prisma/prisma.service';

@Module({
  controllers: [OrderController],
  exports: [
    CreateOrderUseCase,
    FindAllOrderUseCase,
    FindOneOrderUseCase,
    UpdateOrderUseCase,
    DeleteOrderUseCase,
  ],
  providers: [
    PrismaService,
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
      provide: FindAllOrderUseCase,
      useFactory: (repo: OrderPrismaRepository) => new FindAllOrderUseCase(repo),
      inject: ['OrderRepository'],
    },
    {
      provide: FindOneOrderUseCase,
      useFactory: (repo: OrderPrismaRepository) => new FindOneOrderUseCase(repo),
      inject: ['OrderRepository'],
    },
    {
      provide: UpdateOrderUseCase,
      useFactory: (repo: OrderPrismaRepository) => new UpdateOrderUseCase(repo),
      inject: ['OrderRepository'],
    },
    {
      provide: DeleteOrderUseCase,
      useFactory: (repo: OrderPrismaRepository) => new DeleteOrderUseCase(repo),
      inject: ['OrderRepository'],
    },
  ],
})
export class OrderModule {}
