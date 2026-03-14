import { Category } from '@domain/category/entities/category.entity';
import { PrismaService } from '@infrastructure/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Module } from '@nestjs/common';

@Injectable()
export class CategoryPrismaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(category: Category & { companyUuid?: string }): Promise<Category> {
    const data: any = { name: category.name };
    if ((category as any).companyUuid) data.companyUuid = (category as any).companyUuid;
    const row = await this.prisma.client.category.create({ data });
    return new Category(row.uuid, row.name, row.companyUuid);
  }

  async findAll(companyUuid?: string): Promise<Category[]> {
    const where = companyUuid ? { companyUuid } : {};
    const rows = await this.prisma.client.category.findMany({ where, orderBy: { name: 'asc' } });
    return rows.map((r) => new Category(r.uuid, r.name, r.companyUuid));
  }
}

@Module({
  providers: [PrismaService, CategoryPrismaRepository],
  exports: [CategoryPrismaRepository],
})
export class ProductModule {}