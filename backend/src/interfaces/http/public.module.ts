import { Module } from '@nestjs/common';
import { PublicController } from './public.controller';
import { PrismaService } from '@infrastructure/prisma/prisma.service';
import { OrderModule } from './order.module';

@Module({
  imports: [OrderModule],
  controllers: [PublicController],
  providers: [PrismaService],
})
export class PublicModule {}
