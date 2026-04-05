import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { PrismaService } from '@infrastructure/prisma/prisma.service';
import { PermissionsModule } from './permissions.module';
import { RealtimeModule } from '@interfaces/websocket/realtime.module';

@Module({
  imports: [PermissionsModule, RealtimeModule],
  controllers: [CompanyController],
  providers: [PrismaService],
})
export class CompanyModule {}
