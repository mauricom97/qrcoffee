import { Module } from '@nestjs/common';
import { CashierController } from './cashier.controller';
import { CashierService } from '@application/cashier/cashier.service';
import { PrismaService } from '@infrastructure/prisma/prisma.service';
import { PermissionsModule } from './permissions.module';

@Module({
  imports: [PermissionsModule],
  controllers: [CashierController],
  providers: [PrismaService, CashierService],
  exports: [CashierService],
})
export class CashierModule {}
