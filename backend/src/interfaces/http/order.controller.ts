import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderUseCase } from '@application/order/use-cases/create-order.usecase';
import { FindAllOrderUseCase } from '@application/order/use-cases/find-order.usecase';
import { FindOneOrderUseCase } from '@application/order/use-cases/find-one-order.usecase';
import { UpdateOrderUseCase } from '@application/order/use-cases/update-order.usecase';
import { DeleteOrderUseCase } from '@application/order/use-cases/delete-order.usecase';
import { OrderStatus } from '@domain/order/entities/order.entity';

@Controller('orders')
export class OrderController {
  constructor(
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly findAllOrderUseCase: FindAllOrderUseCase,
    private readonly findOneOrderUseCase: FindOneOrderUseCase,
    private readonly updateOrderUseCase: UpdateOrderUseCase,
    private readonly deleteOrderUseCase: DeleteOrderUseCase,
  ) {}

  @Post()
  async create(
    @Body()
    body: {
      tableUuid: string;
      status?: OrderStatus;
      items: { productUuid: string; quantity: number; unitPrice: number }[];
    },
  ) {
    const order = await this.createOrderUseCase.execute(body);
    const full = await this.findOneOrderUseCase.execute(order.uuid);
    return full ?? order;
  }

  @Get()
  async findAll(
    @Query('tableUuid') tableUuid?: string,
    @Query('status') status?: string,
  ) {
    return await this.findAllOrderUseCase.execute({ tableUuid, status });
  }

  @Get(':uuid')
  async findOne(@Param('uuid', ParseUUIDPipe) uuid: string) {
    const order = await this.findOneOrderUseCase.execute(uuid);
    if (!order) throw new NotFoundException('Pedido não encontrado');
    return order;
  }

  @Patch(':uuid')
  async update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() body: { status?: OrderStatus },
  ) {
    const order = await this.updateOrderUseCase.execute(uuid, body);
    if (!order) throw new NotFoundException('Pedido não encontrado');
    return order;
  }

  @Delete(':uuid')
  async delete(@Param('uuid', ParseUUIDPipe) uuid: string) {
    await this.deleteOrderUseCase.execute(uuid);
  }
}
