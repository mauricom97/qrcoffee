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
import {
  redactOrderFinancialData,
  redactOrdersFinancialData,
} from '@application/permissions/redact-order-finance';
import { PermissionsService } from '@application/permissions/permissions.service';
import { UserRole } from '@infrastructure/prisma/generated';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { PermissionsGuard } from './guards/permissions.guard';
import { RequirePanelPermission } from './decorators/require-permission.decorator';
import { CompanyUuid, CurrentUser, type RequestUser } from './decorators/company.decorator';
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
    private readonly permissionsService: PermissionsService,
  ) {}

  private async canSeeAttendanceFinance(user: RequestUser): Promise<boolean> {
    if (user.role === UserRole.ADMIN) return true;
    const effective = await this.permissionsService.getEffectivePanelPermissions(user.uuid, user.role);
    return effective.includes(PANEL_PERMISSION_CODES.ATTENDANCE_FINANCE);
  }

  @Get()
  async findAll(
    @CompanyUuid() companyUuid: string,
    @CurrentUser() user: RequestUser,
    @Query('tableUuid') tableUuid?: string,
    @Query('status') status?: string,
  ) {
    const orders = await this.findAllOrderUseCase.execute({ tableUuid, status, companyUuid });
    return (await this.canSeeAttendanceFinance(user)) ? orders : redactOrdersFinancialData(orders);
  }

  @Get('summary')
  async getSummary(
    @CompanyUuid() companyUuid: string,
    @CurrentUser() user: RequestUser,
    @Query('tableUuid') tableUuid?: string,
    @Query('status') status?: string,
  ) {
    const orders = await this.findAllOrderUseCase.execute({ tableUuid, status, companyUuid });
    const visibleOrders = (await this.canSeeAttendanceFinance(user))
      ? orders
      : redactOrdersFinancialData(orders);
    const byTable = new Map<
      string,
      { tableNumber: number; orders: OrderListDto[]; total: number }
    >();
    let grandTotal = 0;

    for (const order of visibleOrders) {
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
    @CurrentUser() user: RequestUser,
  ) {
    const comanda = await this.findOneOrderUseCase.execute(uuid, companyUuid);
    if (!comanda) throw new NotFoundException('Comanda não encontrada');
    return (await this.canSeeAttendanceFinance(user)) ? comanda : redactOrderFinancialData(comanda);
  }

  @Patch(':uuid')
  async update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @CompanyUuid() companyUuid: string,
    @CurrentUser() user: RequestUser,
    @Body() body: { status?: OrderStatus },
  ) {
    const comanda = await this.updateOrderUseCase.execute(uuid, body, companyUuid);
    if (!comanda) throw new NotFoundException('Comanda não encontrada');
    this.realtime.emitOrdersUpdate(companyUuid);
    return (await this.canSeeAttendanceFinance(user)) ? comanda : redactOrderFinancialData(comanda);
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
