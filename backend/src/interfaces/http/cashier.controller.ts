import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { CashierService, MovementType } from '@application/cashier/cashier.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CompanyUuid } from './decorators/company.decorator';

@Controller('cashier')
@UseGuards(JwtAuthGuard)
export class CashierController {
  constructor(private readonly cashierService: CashierService) {}

  @Get('status')
  async getStatus(@CompanyUuid() companyUuid: string) {
    return this.cashierService.getSessionSummary(companyUuid);
  }

  @Post('open')
  async open(
    @CompanyUuid() companyUuid: string,
    @Body() body: { openingBalance?: number },
  ) {
    const balance = typeof body.openingBalance === 'number' ? body.openingBalance : 0;
    if (balance < 0) {
      throw new BadRequestException('O valor de abertura deve ser maior ou igual a zero.');
    }
    return this.cashierService.openSession(companyUuid, balance);
  }

  @Post('close')
  async close(
    @CompanyUuid() companyUuid: string,
    @Body() body: { closingBalance: number },
  ) {
    if (typeof body.closingBalance !== 'number') {
      throw new BadRequestException('Informe o valor de fechamento do caixa.');
    }
    if (body.closingBalance < 0) {
      throw new BadRequestException('O valor de fechamento deve ser maior ou igual a zero.');
    }
    return this.cashierService.closeSession(companyUuid, body.closingBalance);
  }

  @Post('movement')
  async addMovement(
    @CompanyUuid() companyUuid: string,
    @Body() body: { type: MovementType; amount: number; description?: string },
  ) {
    if (!body.type || !['REINFORCEMENT', 'SANGRIA'].includes(body.type)) {
      throw new BadRequestException('Tipo inválido. Use REINFORCEMENT ou SANGRIA.');
    }
    if (typeof body.amount !== 'number' || body.amount <= 0) {
      throw new BadRequestException('O valor deve ser um número maior que zero.');
    }
    return this.cashierService.addMovement(
      companyUuid,
      body.type as MovementType,
      body.amount,
      body.description,
    );
  }

  @Get('history')
  async getHistory(
    @CompanyUuid() companyUuid: string,
    @Query('limit') limit?: string,
  ) {
    const limitNum = limit ? parseInt(limit, 10) : 10;
    if (isNaN(limitNum) || limitNum < 1 || limitNum > 50) {
      throw new BadRequestException('Limit deve ser um número entre 1 e 50.');
    }
    return this.cashierService.getHistory(companyUuid, limitNum);
  }
}
