import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Delete,
  Query,
  Body,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { FindAllOrderUseCase } from '@application/order/use-cases/find-order.usecase';
import { FindOneOrderUseCase } from '@application/order/use-cases/find-one-order.usecase';
import { UpdateOrderUseCase } from '@application/order/use-cases/update-order.usecase';
import { DeleteOrderUseCase } from '@application/order/use-cases/delete-order.usecase';
import { OrderStatus } from '@domain/order/entities/order.entity';
import { OrderListDto } from '@domain/order/repositories/order.repository';
import { PANEL_PERMISSION_CODES } from '@application/permissions/panel-permissions';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { PermissionsGuard } from './guards/permissions.guard';
import { RequirePanelPermission } from './decorators/require-permission.decorator';
import { CompanyUuid } from './decorators/company.decorator';
import { RealtimeGateway } from '@interfaces/websocket/realtime.gateway';

@Controller('comandas')
@UseGuards(JwtAuthGuard, PermissionsGuard)
@RequirePanelPermission(PANEL_PERMISSION_CODES.TABS)
export class ComandaController {
  constructor(
    private readonly findAllOrderUseCase: FindAllOrderUseCase,
    private readonly findOneOrderUseCase: FindOneOrderUseCase,
    private readonly updateOrderUseCase: UpdateOrderUseCase,
    private readonly deleteOrderUseCase: DeleteOrderUseCase,
    private readonly realtime: RealtimeGateway,
  ) {}

  @Get()
  async findAll(
    @CompanyUuid() companyUuid: string,
    @Query('tableUuid') tableUuid?: string,
    @Query('status') status?: string,
  ) {
    return await this.findAllOrderUseCase.execute({ tableUuid, status, companyUuid });
  }

  @Get('summary')
  async getSummary(
    @CompanyUuid() companyUuid: string,
    @Query('tableUuid') tableUuid?: string,
    @Query('status') status?: string,
  ) {
    const orders = await this.findAllOrderUseCase.execute({ tableUuid, status, companyUuid });
    const byTable = new Map<
      string,
      { tableNumber: number; orders: OrderListDto[]; total: number }
    >();
    let grandTotal = 0;

    for (const order of orders) {
      const orderTotal = order.items.reduce(
        (sum, item) => sum + item.unitPrice * item.quantity,
        0,
      );
      grandTotal += orderTotal;
      const key = order.tableUuid;
      if (!byTable.has(key)) {
        byTable.set(key, {
          tableNumber: order.tableNumber,
          orders: [],
          total: 0,
        });
      }
      const row = byTable.get(key)!;
      row.orders.push(order);
      row.total += orderTotal;
    }

    const tables = Array.from(byTable.entries()).map(([uuid, data]) => ({
      tableUuid: uuid,
      tableNumber: data.tableNumber,
      orders: data.orders,
      total: data.total,
    }));

    return { tables, grandTotal };
  }

  @Get(':uuid')
  async findOne(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @CompanyUuid() companyUuid: string,
  ) {
    const comanda = await this.findOneOrderUseCase.execute(uuid, companyUuid);
    if (!comanda) throw new NotFoundException('Comanda não encontrada');
    return comanda;
  }

  @Patch(':uuid')
  async update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @CompanyUuid() companyUuid: string,
    @Body() body: { status?: OrderStatus },
  ) {
    const comanda = await this.updateOrderUseCase.execute(uuid, body, companyUuid);
    if (!comanda) throw new NotFoundException('Comanda não encontrada');
    this.realtime.emitOrdersUpdate(companyUuid);
    return comanda;
  }

  @Delete(':uuid')
  async remove(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @CompanyUuid() companyUuid: string,
  ) {
    await this.deleteOrderUseCase.execute(uuid, companyUuid);
    this.realtime.emitOrdersUpdate(companyUuid);
  }
}
