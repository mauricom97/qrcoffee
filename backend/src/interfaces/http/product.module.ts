// src/interfaces/http/product.module.ts
import { Module } from '@nestjs/common'
import { ProductController } from './product.controller'
import { CreateProductUseCase } from '@application/product/use-cases/create-product.usecase'
import { FindAllProductUseCase } from '@application/product/use-cases/find-all-product.usecase'
import { ProductPrismaRepository } from '@infrastructure/product/repositories/product-prisma.repository'
import { PrismaService } from '@infrastructure/prisma/prisma.service'

@Module({
  controllers: [ProductController],
  providers: [
    PrismaService,
    {
      provide: 'ProductRepository',
      useClass: ProductPrismaRepository,
    },
    {
      provide: CreateProductUseCase,
      useFactory: (repo) => new CreateProductUseCase(repo),
      inject: ['ProductRepository'],
    },
    {
      provide: FindAllProductUseCase,
      useFactory: (repo) => new FindAllProductUseCase(repo),
      inject: ['ProductRepository'],
    },
  ],
})
export class ProductModule {}
