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
import { InvoiceModule } from '@interfaces/http/invoice.module';

@Module({
  imports: [AuthModule, ProductModule, CategoryModule, TableModule, OrderModule, ComandaModule, DashboardModule, InvoiceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
