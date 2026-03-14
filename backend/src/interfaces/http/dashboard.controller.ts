import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { DashboardService } from '@application/dashboard/dashboard.service';
import type { DashboardPeriod } from '@application/dashboard/dashboard.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CompanyUuid } from './decorators/company.decorator';

@Controller('dashboard')
@UseGuards(JwtAuthGuard)
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
