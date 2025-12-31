// infrastructure/product/product.module.ts
import { Module } from '@nestjs/common';
import { ProductController } from '@interfaces/product/product.controller';
import { CreateProductUseCase } from '@application/product/use-cases/create-prodcut.usecase';
import { ProductPrismaRepository } from '../product/repositories/product-prisma.repository';

@Module({
  controllers: [ProductController],
  providers: [
    {
      provide: 'ProductRepository',
      useClass: ProductPrismaRepository,
    },
    {
      provide: CreateProductUseCase,
      useFactory: (repo) => new CreateProductUseCase(repo),
      inject: ['ProductRepository'],
    },
  ],
})
export class ProductModule {}
