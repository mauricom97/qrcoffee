import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from '@interfaces/http/product.module';
import { CategoryModule } from '@interfaces/http/category.module';
import { TableModule } from '@interfaces/http/table.module';
import { OrderModule } from '@interfaces/http/order.module';
import { ComandaModule } from '@interfaces/http/comanda.module';
import { DashboardModule } from '@interfaces/http/dashboard.module';
import { AuthModule } from '@interfaces/http/auth.module';
import { PublicModule } from '@interfaces/http/public.module';
import { CashierModule } from '@interfaces/http/cashier.module';
import { CompanyModule } from '@interfaces/http/company.module';
import { TeamModule } from '@interfaces/http/team.module';
import { RealtimeModule } from '@interfaces/websocket/realtime.module';

@Module({
  imports: [AuthModule, RealtimeModule, ProductModule, CategoryModule, TableModule, OrderModule, ComandaModule, DashboardModule, CashierModule, PublicModule, CompanyModule, TeamModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
