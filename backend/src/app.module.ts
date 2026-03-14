import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from '@interfaces/http/product.module';
import { CategoryModule } from '@interfaces/http/category.module';
import { TableModule } from '@interfaces/http/table.module';
import { OrderModule } from '@interfaces/http/order.module';

@Module({
  imports: [ProductModule, CategoryModule, TableModule, OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
