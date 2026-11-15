import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { DashboardService } from '@application/dashboard/dashboard.service';
import type { DashboardPeriod } from '@application/dashboard/dashboard.service';
import { PANEL_PERMISSION_CODES } from '@application/permissions/panel-permissions';
import { PermissionsService } from '@application/permissions/permissions.service';
import { UserRole } from '@infrastructure/prisma/generated';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { PermissionsGuard } from './guards/permissions.guard';
import { RequirePanelPermission } from './decorators/require-permission.decorator';
import { CompanyUuid, CurrentUser, type RequestUser } from './decorators/company.decorator';

@Controller('dashboard')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class DashboardController {
  constructor(
    private readonly dashboardService: DashboardService,
    private readonly permissionsService: PermissionsService,
  ) {}

  @Get('attendance')
  @RequirePanelPermission(PANEL_PERMISSION_CODES.DASHBOARD)
  async getAttendance(
    @CompanyUuid() companyUuid: string,
    @Query('period') period?: DashboardPeriod,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    const validPeriod = period === 'day' || period === 'month' ? period : 'month';
    return this.dashboardService.getAttendanceStats(validPeriod, from, to, companyUuid);
  }

  @Get('attendance/summary')
  @RequirePanelPermission(PANEL_PERMISSION_CODES.DASHBOARD)
  async getAttendanceSummary(
    @CompanyUuid() companyUuid: string,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    return this.dashboardService.getAttendanceSummary(from, to, companyUuid);
  }

  @Get('financial')
  @RequirePanelPermission(
    PANEL_PERMISSION_CODES.DASHBOARD,
    PANEL_PERMISSION_CODES.DASHBOARD_FINANCE,
  )
  async getFinancial(
    @CompanyUuid() companyUuid: string,
    @Query('period') period?: DashboardPeriod,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    const validPeriod = period === 'day' || period === 'month' ? period : 'month';
    return this.dashboardService.getFinancialStats(validPeriod, from, to, companyUuid);
  }

  @Get('financial/summary')
  @RequirePanelPermission(
    PANEL_PERMISSION_CODES.DASHBOARD,
    PANEL_PERMISSION_CODES.DASHBOARD_FINANCE,
  )
  async getFinancialSummary(
    @CompanyUuid() companyUuid: string,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    return this.dashboardService.getFinancialSummary(from, to, companyUuid);
  }

  @Get('top-products')
  @RequirePanelPermission(PANEL_PERMISSION_CODES.DASHBOARD)
  async getTopProducts(
    @CompanyUuid() companyUuid: string,
    @CurrentUser() user: RequestUser,
    @Query('period') period?: DashboardPeriod,
    @Query('from') from?: string,
    @Query('to') to?: string,
    @Query('limit') limit?: string,
  ) {
    const validPeriod = period === 'day' || period === 'month' ? period : 'month';
    const parsedLimit = limit != null ? Number(limit) : 8;
    const rows = await this.dashboardService.getTopProducts(
      validPeriod,
      from,
      to,
      companyUuid,
      Number.isFinite(parsedLimit) ? parsedLimit : 8,
    );
    if (await this.canViewFinance(user)) return rows;
    return rows.map(({ productUuid, name, quantity }) => ({
      productUuid,
      name,
      quantity,
    }));
  }

  private async canViewFinance(user: RequestUser): Promise<boolean> {
    if (user.role === UserRole.ADMIN) return true;
    const effective = await this.permissionsService.getEffectivePanelPermissions(
      user.uuid,
      user.role,
    );
    return effective.includes(PANEL_PERMISSION_CODES.DASHBOARD_FINANCE);
  }
}
