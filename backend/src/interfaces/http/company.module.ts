import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { PrismaService } from '@infrastructure/prisma/prisma.service';
import { PermissionsModule } from './permissions.module';

@Module({
  imports: [PermissionsModule],
  controllers: [CompanyController],
  providers: [PrismaService],
})
export class CompanyModule {}
