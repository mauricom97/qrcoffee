// src/interfaces/http/category.module.ts
import { Module } from '@nestjs/common'
import { CategoryController } from './category.controller'
import { CreateCategoryUseCase } from '@application/category/use-cases/create-category-usecase'
import { FindAllCategoryUseCase } from '@application/category/use-cases/find-all-category.usecase'
// import { DestroyProductUseCase } from '@application/product/use-cases/destroy-product.usecase'
import { CategoryPrismaRepository } from '@infrastructure/category/repositories/category-prisma.repository'
import { PrismaService } from '@infrastructure/prisma/prisma.service'

import { RealtimeModule } from '@interfaces/websocket/realtime.module'
import { PermissionsModule } from './permissions.module'

@Module({
  imports: [RealtimeModule, PermissionsModule],
  controllers: [CategoryController],
  providers: [
    PrismaService,
    {
      provide: 'CategoryRepository',
      useClass: CategoryPrismaRepository,
    },
    {
      provide: CreateCategoryUseCase,
      useFactory: (repo) => new CreateCategoryUseCase(repo),
      inject: ['CategoryRepository'],
    },
    {
      provide: FindAllCategoryUseCase,
      useFactory: (repo) => new FindAllCategoryUseCase(repo),
      inject: ['CategoryRepository'],
    },
    // {
    //   provide: DestroyProductUseCase,
    //   useFactory: (repo) => new DestroyProductUseCase(repo),
    //   inject: ['ProductRepository'],
    // },
  ],
})
export class CategoryModule { }
