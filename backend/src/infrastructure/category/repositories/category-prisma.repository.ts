// src/infrastructure/product/repositories/product-prisma.repository.ts
import { Category } from '@domain/category/entities/category.entity'
import { PrismaService } from '@infrastructure/prisma/prisma.service'
import { Module } from '@nestjs/common'
const prisma = new PrismaService()

export class CategoryPrismaRepository {
  async save(category: Category): Promise<Category> {
    return await prisma.client.category.create({
      data: {
        uuid: category.uuid,
        name: category.name
      },
    })
  }

  async findAll(): Promise<Category[]> {
    return await prisma.client.category.findMany()
  }
}

@Module({
  providers: [PrismaService, CategoryPrismaRepository],
  exports: [CategoryPrismaRepository],
})
export class ProductModule {}