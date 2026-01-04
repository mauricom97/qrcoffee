// src/infrastructure/prisma/prisma.service.ts
import { Injectable } from '@nestjs/common'
import { prisma } from './prisma.client'
@Injectable()
export class PrismaService {
  get client() {
    return prisma
  }
}
