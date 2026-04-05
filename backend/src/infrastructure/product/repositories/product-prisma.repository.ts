import { randomUUID } from 'node:crypto';
import { Product } from '@domain/product/entities/product.entity';
import type { ProductAddonInput } from '@domain/product/types/product-addon-input';
import { UpdateProductDTO } from '@interfaces/product/dto/update-product.dto';
import { PrismaService } from '@infrastructure/prisma/prisma.service';
import { Module } from '@nestjs/common';

const prisma = new PrismaService();

function normalizeAddonRows(raw: ProductAddonInput[] | undefined) {
  if (!raw?.length) return [];
  return raw
    .filter((a) => a && typeof a.name === 'string' && a.name.trim().length > 0)
    .map((a, i) => ({
      uuid: randomUUID(),
      name: a.name.trim().slice(0, 120),
      extraPrice: Math.max(0, Number(a.extraPrice) || 0),
      active: a.active !== false,
      sortOrder: typeof a.sortOrder === 'number' && !Number.isNaN(a.sortOrder) ? a.sortOrder : i,
    }));
}

export class ProductPrismaRepository {
  async save(product: Product, addons?: ProductAddonInput[]): Promise<void> {
    const rows = normalizeAddonRows(addons);
    await prisma.client.$transaction(async (tx) => {
      await tx.product.create({
        data: {
          uuid: product.uuid,
          name: product.name,
          price: product.price,
          description: product.description,
          active: product.active,
          categoryUuid: product.categoryUuid,
          companyUuid: product.companyUuid,
          isKitchenProduct: product.isKitchenProduct,
        },
      });
      if (rows.length) {
        await tx.productAddon.createMany({
          data: rows.map((r) => ({
            uuid: r.uuid,
            productUuid: product.uuid,
            name: r.name,
            extraPrice: r.extraPrice,
            active: r.active,
            sortOrder: r.sortOrder,
          })),
        });
      }
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
      companyUuid: product.companyUuid,
      isKitchenProduct: product.isKitchenProduct,
    }));
    return await prisma.client.product.createMany({ data });
  }

  async findAll(filters: {
    categoryUuid?: string;
    name?: string;
    companyUuid?: string;
  }): Promise<Product[]> {
    const where: any = {};
    if (filters.companyUuid) {
      where.category = { companyUuid: filters.companyUuid };
    }
    if (filters.categoryUuid) where.categoryUuid = filters.categoryUuid;
    if (filters.name && filters.name.length >= 3) {
      where.OR = [
        { name: { contains: filters.name, mode: 'insensitive' } },
        { description: { contains: filters.name, mode: 'insensitive' } },
      ];
    }
    return await prisma.client.product.findMany({
      where,
      include: {
        category: {
          select: {
            uuid: true,
            name: true,
          },
        },
        addons: {
          orderBy: { sortOrder: 'asc' },
        },
      },
    }) as unknown as Product[];
  }

  async update({
    dataForUpdate,
    uuid,
  }: {
    dataForUpdate: UpdateProductDTO;
    uuid: string;
  }) {
    const data: Record<string, unknown> = {};
    if (dataForUpdate.name !== undefined) data.name = dataForUpdate.name;
    if (dataForUpdate.description !== undefined) data.description = dataForUpdate.description;
    if (dataForUpdate.active !== undefined) data.active = dataForUpdate.active;
    if (dataForUpdate.categoryUuid !== undefined) data.categoryUuid = dataForUpdate.categoryUuid;
    if (dataForUpdate.isKitchenProduct !== undefined)
      data.isKitchenProduct = dataForUpdate.isKitchenProduct;
    if (
      dataForUpdate.price !== undefined &&
      dataForUpdate.price !== '' &&
      dataForUpdate.price !== null
    ) {
      const p = Number(dataForUpdate.price);
      if (!Number.isNaN(p)) data.price = p;
    }

    await prisma.client.$transaction(async (tx) => {
      if (Object.keys(data).length > 0) {
        await tx.product.update({
          where: { uuid },
          data: data as any,
        });
      }
      if (dataForUpdate.addons !== undefined) {
        await tx.productAddon.deleteMany({ where: { productUuid: uuid } });
        const rows = normalizeAddonRows(dataForUpdate.addons);
        if (rows.length) {
          await tx.productAddon.createMany({
            data: rows.map((r) => ({
              uuid: r.uuid,
              productUuid: uuid,
              name: r.name,
              extraPrice: r.extraPrice,
              active: r.active,
              sortOrder: r.sortOrder,
            })),
          });
        }
      }
    });

    return await prisma.client.product.findFirst({
      where: { uuid },
      include: {
        category: {
          select: {
            uuid: true,
            name: true,
          },
        },
        addons: {
          orderBy: { sortOrder: 'asc' },
        },
      },
    });
  }

  async destroy(uuid: string): Promise<void> {
    await prisma.client.product.delete({
      where: { uuid },
    });
  }

  async findById(uuid: string): Promise<Product | null> {
    const row = await prisma.client.product.findUnique({
      where: { uuid },
      include: {
        addons: { orderBy: { sortOrder: 'asc' } },
      },
    });
    return row as unknown as Product | null;
  }
}

@Module({
  providers: [PrismaService, ProductPrismaRepository],
  exports: [ProductPrismaRepository],
})
export class ProductModule {}
