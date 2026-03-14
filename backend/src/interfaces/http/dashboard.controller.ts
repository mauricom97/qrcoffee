import { Controller, Get, Query } from '@nestjs/common';
import { DashboardService } from '@application/dashboard/dashboard.service';
import type { DashboardPeriod } from '@application/dashboard/dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('attendance')
  async getAttendance(
    @Query('period') period?: DashboardPeriod,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    const validPeriod = period === 'day' || period === 'month' ? period : 'month';
    return this.dashboardService.getAttendanceStats(validPeriod, from, to);
  }

  @Get('attendance/summary')
  async getAttendanceSummary(
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    return this.dashboardService.getAttendanceSummary(from, to);
  }

  @Get('financial')
  async getFinancial(
    @Query('period') period?: DashboardPeriod,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    const validPeriod = period === 'day' || period === 'month' ? period : 'month';
    return this.dashboardService.getFinancialStats(validPeriod, from, to);
  }

  @Get('financial/summary')
  async getFinancialSummary(
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    return this.dashboardService.getFinancialSummary(from, to);
  }
}
