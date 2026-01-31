// domain/product/repositories/product.repository.ts
import { Product } from '../entities/product.entity';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';

export interface ProductRepository {
  save(product: Product): Promise<void>;
  findAll(): Promise<Product[]>;
  destroy(uuid: string): Promise<void>;
}

@Injectable()
export class ProductPrismaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(product: Product): Promise<Product> {
    return this.prisma.client.product.create({ data: product });
  }

  async findAll(): Promise<Product[]> {
    return this.prisma.client.product.findMany();
  }

  async destroy(uuid: string): Promise<Product> {
    return this.prisma.client.product.delete({
      where: { uuid: uuid },
    })
  }
}
