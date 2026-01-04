// infrastructure/product/product.module.ts
import { Module } from '@nestjs/common';
import { ProductController } from '@interfaces/product/product.controller';
import { CreateProductUseCase } from '@/application/product/use-cases/create-product.usecase';
import { FindAllProductUseCase } from '@/application/product/use-cases/find-all-product.usecase';
import { ProductPrismaRepository } from '../product/repositories/product-prisma.repository';
import { PrismaService } from '../prisma/prisma.service';
@Module({
  controllers: [ProductController],
  providers: [
    PrismaService, ProductPrismaRepository,
    {
      provide: 'ProductRepository',
      useClass: ProductPrismaRepository,
    },
    {
      provide: CreateProductUseCase,
      useFactory: (repo) => new CreateProductUseCase(repo),
      inject: ['ProductRepository'],
    }
  ],
  exports: [ProductPrismaRepository]
})
export class ProductModule { }
