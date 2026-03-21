import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '@infrastructure/prisma/prisma.service';

export type MovementType = 'REINFORCEMENT' | 'SANGRIA';

export interface CashierSessionResponse {
  uuid: string;
  openedAt: string;
  openingBalance: number;
  status: string;
  currentBalance: number;
  movements: { uuid: string; type: string; amount: number; createdAt: string }[];
}

@Injectable()
export class CashierService {
  constructor(private readonly prisma: PrismaService) {}

  private get client() {
    return this.prisma.client as any;
  }

  async getCurrentSession(companyUuid: string): Promise<CashierSessionResponse | null> {
    const session = await this.client.cashierSession.findFirst({
      where: { companyUuid, status: 'OPEN' },
      include: { movements: { orderBy: { createdAt: 'desc' } } },
    });
    if (!session) return null;

    const currentBalance = this.calculateBalance(session);
    return {
      uuid: session.uuid,
      openedAt: session.openedAt.toISOString(),
      openingBalance: session.openingBalance,
      status: session.status,
      currentBalance: Math.round(currentBalance * 100) / 100,
      movements: session.movements.map((m: any) => ({
        uuid: m.uuid,
        type: m.type,
        amount: m.amount,
        createdAt: m.createdAt.toISOString(),
      })),
    };
  }

  async openSession(companyUuid: string, openingBalance: number): Promise<CashierSessionResponse> {
    const existing = await this.client.cashierSession.findFirst({
      where: { companyUuid, status: 'OPEN' },
    });
    if (existing) {
      throw new BadRequestException('Já existe um caixa aberto. Feche-o antes de abrir outro.');
    }

    const session = await this.client.cashierSession.create({
      data: {
        companyUuid,
        openingBalance: openingBalance ?? 0,
        status: 'OPEN',
      },
      include: { movements: true },
    });

    return {
      uuid: session.uuid,
      openedAt: session.openedAt.toISOString(),
      openingBalance: session.openingBalance,
      status: session.status,
      currentBalance: session.openingBalance,
      movements: [],
    };
  }

  async addMovement(
    companyUuid: string,
    type: MovementType,
    amount: number,
    description?: string,
  ): Promise<CashierSessionResponse> {
    if (amount <= 0) {
      throw new BadRequestException('O valor deve ser maior que zero.');
    }

    const session = await this.client.cashierSession.findFirst({
      where: { companyUuid, status: 'OPEN' },
      include: { movements: true },
    });
    if (!session) {
      throw new BadRequestException('Nenhum caixa aberto. Abra o caixa primeiro.');
    }

    const currentBalance = this.calculateBalance(session);
    if (type === 'SANGRIA' && amount > currentBalance) {
      throw new BadRequestException(
        `Saldo insuficiente para sangria. Saldo atual: R$ ${currentBalance.toFixed(2)}`,
      );
    }

    await this.client.cashierMovement.create({
      data: {
        sessionUuid: session.uuid,
        type,
        amount,
        description: description ?? null,
      },
    });

    return this.getCurrentSession(companyUuid) as Promise<CashierSessionResponse>;
  }

  async closeSession(
    companyUuid: string,
    closingBalance: number,
  ): Promise<{ success: boolean; dailySales: number; expectedTotal: number; difference: number }> {
    const session = await this.client.cashierSession.findFirst({
      where: { companyUuid, status: 'OPEN' },
      include: { movements: true },
    });
    if (!session) {
      throw new BadRequestException('Nenhum caixa aberto para fechar.');
    }

    const expectedTotal = this.calculateBalance(session);
    const dailySales = await this.getDailySales(companyUuid, session.openedAt, new Date());
    const difference = Math.round((closingBalance - expectedTotal) * 100) / 100;

    await this.client.cashierSession.update({
      where: { uuid: session.uuid },
      data: {
        status: 'CLOSED',
        closedAt: new Date(),
        closingBalance,
      },
    });

    return {
      success: true,
      dailySales: Math.round(dailySales * 100) / 100,
      expectedTotal: Math.round(expectedTotal * 100) / 100,
      difference,
    };
  }

  async getDailySales(
    companyUuid: string,
    from: Date,
    to: Date,
  ): Promise<number> {
    const orders = await this.client.order.findMany({
      where: {
        table: { companyUuid },
        status: 'DELIVERED',
        createdAt: { gte: from, lte: to },
      },
      include: { items: true },
    });

    let total = 0;
    for (const order of orders) {
      for (const item of order.items) {
        total += item.quantity * item.unitPrice;
      }
    }
    return total;
  }

  async getSessionSummary(companyUuid: string): Promise<{
    hasOpenSession: boolean;
    dailySales: number;
    session?: CashierSessionResponse;
  }> {
    const session = await this.getCurrentSession(companyUuid);
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const dailySales = await this.getDailySales(companyUuid, startOfDay, new Date());

    return {
      hasOpenSession: !!session,
      dailySales: Math.round(dailySales * 100) / 100,
      session: session ?? undefined,
    };
  }

  async getHistory(
    companyUuid: string,
    limit = 10,
  ): Promise<
    { uuid: string; openedAt: string; closedAt: string | null; openingBalance: number; closingBalance: number | null; status: string }[]
  > {
    const sessions = await this.client.cashierSession.findMany({
      where: { companyUuid },
      orderBy: { openedAt: 'desc' },
      take: limit,
      select: {
        uuid: true,
        openedAt: true,
        closedAt: true,
        openingBalance: true,
        closingBalance: true,
        status: true,
      },
    });
    return sessions.map((s: any) => ({
      uuid: s.uuid,
      openedAt: s.openedAt.toISOString(),
      closedAt: s.closedAt?.toISOString() ?? null,
      openingBalance: s.openingBalance,
      closingBalance: s.closingBalance ?? null,
      status: s.status,
    }));
  }

  private calculateBalance(session: any): number {
    let balance = session.openingBalance;
    for (const m of session.movements) {
      balance += m.type === 'REINFORCEMENT' ? m.amount : -m.amount;
    }
    return balance;
  }
}
