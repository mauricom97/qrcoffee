import { Module } from '@nestjs/common';
import { PermissionsService } from '@application/permissions/permissions.service';
import { PermissionsGuard } from './guards/permissions.guard';
import { PrismaService } from '@infrastructure/prisma/prisma.service';

@Module({
  providers: [PrismaService, PermissionsService, PermissionsGuard],
  exports: [PermissionsService, PermissionsGuard],
})
export class PermissionsModule {}
