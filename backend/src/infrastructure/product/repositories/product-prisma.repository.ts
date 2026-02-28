// src/infrastructure/product/repositories/product-prisma.repository.ts
import { Product } from '@domain/product/entities/product.entity';
import { PrismaService } from '@infrastructure/prisma/prisma.service';
import { Module } from '@nestjs/common';
const prisma = new PrismaService();

export class ProductPrismaRepository {
  async save(product: Product): Promise<Product> {
    return await prisma.client.product.create({
      data: {
        uuid: product.uuid,
        name: product.name,
        price: product.price,
        description: product.description,
        active: product.active,
        categoryUuid: product.categoryUuid,
      },
    });
  }

  async saveMany(products: Product[]): Promise<any> {
    const data = products.map((product) => ({
      uuid: product.uuid,
      name: product.name,
      price: product.price,
      description: product.description,
      active: product.active,
      categoryUuid: product.categoryUuid,
    }));
    return await prisma.client.product.createMany({ data });
  }

  async findAll(): Promise<Product[]> {
    return await prisma.client.product.findMany();
  }

  async update({ dataForUpdate, uuid }: { dataForUpdate: Partial<Product>; uuid: string }) {
    return await prisma.client.product.update({
      where: { uuid },
      data: {
        name: dataForUpdate.name,
        price: dataForUpdate.price,
        description: dataForUpdate.description,
        active: dataForUpdate.active,
        categoryUuid: dataForUpdate.categoryUuid,
      },
    });
  }

  async destroy(uuid: string): Promise<void> {
    await prisma.client.product.delete({
      where: { uuid },
    });
  }
}

@Module({
  providers: [PrismaService, ProductPrismaRepository],
  exports: [ProductPrismaRepository],
})
export class ProductModule {}
