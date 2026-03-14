import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from '@application/dashboard/dashboard.service';
import { PrismaService } from '@infrastructure/prisma/prisma.service';

@Module({
  controllers: [DashboardController],
  providers: [PrismaService, DashboardService],
  exports: [DashboardService],
})
export class DashboardModule {}
