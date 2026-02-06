// domain/product/repositories/product.repository.ts
import { Product } from '../entities/product.entity';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';

export interface ProductRepository {
  save(product: Product): Promise<void>;
  saveMany(products: Product[]): Promise<void>;
  findAll(): Promise<ProductWithCategoryDto[]>;
  destroy(uuid: string): Promise<void>;
}

export class ProductWithCategoryDto {
  uuid: string;
  name: string;
  price: number;
  active: boolean;
  description: string;
  categoryUuid: string;
  category: {
    uuid: string;
    name: string;
  };
}

@Injectable()
export class ProductPrismaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(product: Product): Promise<Product> {
    return this.prisma.client.product.create({ data: product });
  }

  async saveMany(products: Product[]): Promise<any> {
    return this.prisma.client.product.createMany({ data: products });
  }

  async findAll(): Promise<ProductWithCategoryDto[]> {
    return await this.prisma.client.product.findMany({
      include: {
        category: true,
      },
    });
  }

  async destroy(uuid: string): Promise<Product> {
    return this.prisma.client.product.delete({
      where: { uuid: uuid },
    });
  }
}
