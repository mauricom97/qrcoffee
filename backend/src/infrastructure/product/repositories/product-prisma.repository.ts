// src/infrastructure/product/repositories/product-prisma.repository.ts
import { ProductRepository } from '@domain/product/repositories/product.repository'
import { Product } from '@domain/product/entities/product.entity'
import { PrismaService } from '@infrastructure/prisma/prisma.service'
import { Module } from '@nestjs/common'
const prisma = new PrismaService()

export class ProductPrismaRepository implements ProductRepository {
  constructor(private readonly prisma: PrismaService) {}
  async save(product: Product): Promise<void> {
    await prisma.client.product.create({
      data: {
        uuid: product.uuid,
        name: product.name,
        price: product.price,
        active: true,
        categoryUuid: product.categoryUuid
      },
    })
  }
}

@Module({
  providers: [PrismaService, ProductPrismaRepository],
  exports: [ProductPrismaRepository],
})
export class ProductModule {}