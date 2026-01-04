// src/infrastructure/product/repositories/product-prisma.repository.ts
import { Product } from '@domain/product/entities/product.entity'
import { PrismaService } from '@infrastructure/prisma/prisma.service'
import { Module } from '@nestjs/common'
const prisma = new PrismaService()

export class ProductPrismaRepository {
  async save(product: Product): Promise<Product> {
    return await prisma.client.product.create({
      data: {
        uuid: product.uuid,
        name: product.name,
        price: product.price,
        active: true,
        categoryUuid: product.categoryUuid
      },
    })
  }

  async findAll(): Promise<Product[]> {
    return await prisma.client.product.findMany()
  }

  async destroy(uuid: string): Promise<void> {
    await prisma.client.product.delete({
      where: { uuid },
    })
  }
}

@Module({
  providers: [PrismaService, ProductPrismaRepository],
  exports: [ProductPrismaRepository],
})
export class ProductModule {}