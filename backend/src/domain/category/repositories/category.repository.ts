// domain/product/repositories/product.repository.ts
import { Category } from '../entities/category.entity';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';

export interface ProductRepository {
  findAll(): Promise<Category[]>;
}

@Injectable()
export class CategoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(category: Category): Promise<Category> {
    return this.prisma.client.category.create({ data: category });
  }

  async findAll(): Promise<Category[]> {
    return this.prisma.client.category.findMany();
  }

  async destroy(uuid: string): Promise<Category> {
    return this.prisma.client.category.delete({
      where: { uuid: uuid },
    })
  }
}
