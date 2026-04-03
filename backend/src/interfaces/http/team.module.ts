import { Module } from '@nestjs/common';
import { TeamController } from './team.controller';
import { AdminGuard } from './guards/admin.guard';
import { PrismaService } from '@infrastructure/prisma/prisma.service';

@Module({
  controllers: [TeamController],
  providers: [PrismaService, AdminGuard],
})
export class TeamModule {}
