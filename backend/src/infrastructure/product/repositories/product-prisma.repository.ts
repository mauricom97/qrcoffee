// src/infrastructure/product/repositories/product-prisma.repository.ts
import { ProductRepository } from '@domain/product/repositories/product.repository'
import { Product } from '@domain/product/entities/product.entity'
import { PrismaService } from '@infrastructure/prisma/prisma.service'

export class ProductPrismaRepository implements ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(product: Product): Promise<void> {
    await this.prisma.client.product.create({
      data: {
        uuid: product.uuid,
        name: product.name,
        price: product.price.value,
        active: true,
        categoryUuid: product.categoryUuid
      },
    })
    
  }
}
