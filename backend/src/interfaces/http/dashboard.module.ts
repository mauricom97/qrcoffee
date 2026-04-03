import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from '@application/dashboard/dashboard.service';
import { PrismaService } from '@infrastructure/prisma/prisma.service';
import { PermissionsModule } from './permissions.module';

@Module({
  imports: [PermissionsModule],
  controllers: [DashboardController],
  providers: [PrismaService, DashboardService],
  exports: [DashboardService],
})
export class DashboardModule {}
