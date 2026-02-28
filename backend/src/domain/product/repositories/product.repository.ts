// domain/product/repositories/product.repository.ts
import { Product } from '../entities/product.entity';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';

export interface ProductRepository {
  save(product: Product): Promise<void>;
  saveMany(products: Product[]): Promise<void>;
  update(product: any): Promise<void>;
  findAll(): Promise<ProductWithCategoryDto[]>;
  findById(uuid: string): Promise<Product | null>;
  destroy(uuid: string): Promise<void>;
}

export class ProductWithCategoryDto {
  uuid?: string;
  name?: string;
  price?: number;
  active?: boolean;
  description?: string;
  categoryUuid?: string;
  category?: {
    uuid?: string;
    name?: string;
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

  async update(product: Product): Promise<Product> {
    return this.prisma.client.product.update({
      where: { uuid: product.uuid },
      data: product,
    });
  }

  async findAll(): Promise<ProductWithCategoryDto[]> {
    return await this.prisma.client.product.findMany({
      include: {
        category: true,
      },
    });
  }

  async findById(uuid: string): Promise<Product | null> {
    return this.prisma.client.product.findUnique({
      where: { uuid: uuid },
    });
  }

  async destroy(uuid: string): Promise<Product> {
    return this.prisma.client.product.delete({
      where: { uuid: uuid },
    });
  }
}
