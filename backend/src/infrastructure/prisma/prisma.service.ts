// src/infrastructure/prisma/prisma.service.ts
import { Injectable } from '@nestjs/common'
import { prisma } from '../../../lib/prisma'

@Injectable()
export class PrismaService {
  get client() {
    return prisma
  }
}
