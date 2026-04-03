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
  UseGuards,
} from '@nestjs/common';
import { CreateOrderUseCase } from '@application/order/use-cases/create-order.usecase';
import { FindAllOrderUseCase } from '@application/order/use-cases/find-order.usecase';
import { FindOneOrderUseCase } from '@application/order/use-cases/find-one-order.usecase';
import { UpdateOrderUseCase } from '@application/order/use-cases/update-order.usecase';
import { DeleteOrderUseCase } from '@application/order/use-cases/delete-order.usecase';
import { OrderStatus } from '@domain/order/entities/order.entity';
import { PANEL_PERMISSION_CODES } from '@application/permissions/panel-permissions';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { PermissionsGuard } from './guards/permissions.guard';
import { RequirePanelPermission } from './decorators/require-permission.decorator';
import { CompanyUuid } from './decorators/company.decorator';
import { RealtimeGateway } from '@interfaces/websocket/realtime.gateway';

@Controller('orders')
@UseGuards(JwtAuthGuard, PermissionsGuard)
@RequirePanelPermission(PANEL_PERMISSION_CODES.ORDERS)
export class OrderController {
  constructor(
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly findAllOrderUseCase: FindAllOrderUseCase,
    private readonly findOneOrderUseCase: FindOneOrderUseCase,
    private readonly updateOrderUseCase: UpdateOrderUseCase,
    private readonly deleteOrderUseCase: DeleteOrderUseCase,
    private readonly realtime: RealtimeGateway,
  ) {}

  @Post()
  async create(
    @CompanyUuid() companyUuid: string,
    @Body()
    body: {
      tableUuid: string;
      status?: OrderStatus;
      items: { productUuid: string; quantity: number; unitPrice: number }[];
    },
  ) {
    const order = await this.createOrderUseCase.execute({ ...body, companyUuid });
    const full = await this.findOneOrderUseCase.execute(order.uuid, companyUuid);
    this.realtime.emitOrdersUpdate(companyUuid);
    return full ?? order;
  }

  @Get()
  async findAll(
    @CompanyUuid() companyUuid: string,
    @Query('tableUuid') tableUuid?: string,
    @Query('status') status?: string,
  ) {
    return await this.findAllOrderUseCase.execute({ tableUuid, status, companyUuid });
  }

  @Get(':uuid')
  async findOne(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @CompanyUuid() companyUuid: string,
  ) {
    const order = await this.findOneOrderUseCase.execute(uuid, companyUuid);
    if (!order) throw new NotFoundException('Pedido não encontrado');
    return order;
  }

  @Patch(':uuid')
  async update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @CompanyUuid() companyUuid: string,
    @Body() body: { status?: OrderStatus },
  ) {
    const order = await this.updateOrderUseCase.execute(uuid, body, companyUuid);
    if (!order) throw new NotFoundException('Pedido não encontrado');
    this.realtime.emitOrdersUpdate(companyUuid);
    return order;
  }

  @Delete(':uuid')
  async delete(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @CompanyUuid() companyUuid: string,
  ) {
    await this.deleteOrderUseCase.execute(uuid, companyUuid);
    this.realtime.emitOrdersUpdate(companyUuid);
  }
}
