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
import {
  redactOrderFinancialData,
  redactOrdersFinancialData,
} from '@application/permissions/redact-order-finance';
import { PermissionsService } from '@application/permissions/permissions.service';
import { UserRole } from '@infrastructure/prisma/generated';
import type { OrderListDto } from '@domain/order/repositories/order.repository';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { PermissionsGuard } from './guards/permissions.guard';
import { RequirePanelPermission } from './decorators/require-permission.decorator';
import { CompanyUuid, CurrentUser, type RequestUser } from './decorators/company.decorator';
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
    private readonly permissionsService: PermissionsService,
  ) {}

  private async applyAttendanceFinanceVisibility<T extends OrderListDto | OrderListDto[] | null>(
    user: RequestUser,
    data: T,
  ): Promise<T> {
    if (data == null) return data;
    if (user.role === UserRole.ADMIN) return data;
    const effective = await this.permissionsService.getEffectivePanelPermissions(user.uuid, user.role);
    if (effective.includes(PANEL_PERMISSION_CODES.ATTENDANCE_FINANCE)) return data;
    if (Array.isArray(data)) {
      return redactOrdersFinancialData(data) as T;
    }
    return redactOrderFinancialData(data) as T;
  }

  @Post()
  async create(
    @CompanyUuid() companyUuid: string,
    @CurrentUser() user: RequestUser,
    @Body()
    body: {
      tableUuid: string;
      status?: OrderStatus;
      items: {
        productUuid: string;
        quantity: number;
        unitPrice: number;
        addonsSnapshot?: { name: string; extraPrice: number }[];
      }[];
      observacao?: string | null;
    },
  ) {
    const order = await this.createOrderUseCase.execute({ ...body, companyUuid });
    const full = await this.findOneOrderUseCase.execute(order.uuid, companyUuid);
    this.realtime.emitOrdersUpdate(companyUuid);
    if (!full) return order;
    return this.applyAttendanceFinanceVisibility(user, full);
  }

  @Get()
  async findAll(
    @CompanyUuid() companyUuid: string,
    @CurrentUser() user: RequestUser,
    @Query('tableUuid') tableUuid?: string,
    @Query('status') status?: string,
  ) {
    const list = await this.findAllOrderUseCase.execute({ tableUuid, status, companyUuid });
    return this.applyAttendanceFinanceVisibility(user, list);
  }

  @Get(':uuid')
  async findOne(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @CompanyUuid() companyUuid: string,
    @CurrentUser() user: RequestUser,
  ) {
    const order = await this.findOneOrderUseCase.execute(uuid, companyUuid);
    if (!order) throw new NotFoundException('Pedido não encontrado');
    return this.applyAttendanceFinanceVisibility(user, order);
  }

  @Patch(':uuid')
  async update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @CompanyUuid() companyUuid: string,
    @CurrentUser() user: RequestUser,
    @Body() body: { status?: OrderStatus },
  ) {
    const order = await this.updateOrderUseCase.execute(uuid, body, companyUuid);
    if (!order) throw new NotFoundException('Pedido não encontrado');
    this.realtime.emitOrdersUpdate(companyUuid);
    return this.applyAttendanceFinanceVisibility(user, order);
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
