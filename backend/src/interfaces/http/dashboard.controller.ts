import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { DashboardService } from '@application/dashboard/dashboard.service';
import type { DashboardPeriod } from '@application/dashboard/dashboard.service';
import { PANEL_PERMISSION_CODES } from '@application/permissions/panel-permissions';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { PermissionsGuard } from './guards/permissions.guard';
import { RequirePanelPermission } from './decorators/require-permission.decorator';
import { CompanyUuid } from './decorators/company.decorator';

@Controller('dashboard')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

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
}
