import {
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { DashboardService } from '@application/dashboard/dashboard.service';
import type { DashboardPeriod } from '@application/dashboard/dashboard.service';
import { PANEL_PERMISSION_CODES } from '@application/permissions/panel-permissions';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { PermissionsGuard } from './guards/permissions.guard';
import { RequirePanelPermission } from './decorators/require-permission.decorator';
import { CompanyUuid } from './decorators/company.decorator';

@Controller('dashboard')
@UseGuards(JwtAuthGuard, PermissionsGuard)
@RequirePanelPermission(PANEL_PERMISSION_CODES.DASHBOARD)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('attendance')
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
  async getAttendanceSummary(
    @CompanyUuid() companyUuid: string,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    return this.dashboardService.getAttendanceSummary(from, to, companyUuid);
  }

  @Get('attendance/history')
  async getAttendanceHistory(
    @CompanyUuid() companyUuid: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
    @Query('from') from?: string,
    @Query('to') to?: string,
    @Query('status') status?: string,
    @Query('tableUuid') tableUuid?: string,
  ) {
    return this.dashboardService.getAttendanceHistory(companyUuid, {
      from,
      to,
      status,
      tableUuid,
      page,
      limit,
    });
  }

  @Get('attendance/table-options')
  async getAttendanceTableOptions(@CompanyUuid() companyUuid: string) {
    return this.dashboardService.listAttendanceTableOptions(companyUuid);
  }

  @Get('financial')
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
  async getFinancialSummary(
    @CompanyUuid() companyUuid: string,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    return this.dashboardService.getFinancialSummary(from, to, companyUuid);
  }
}
