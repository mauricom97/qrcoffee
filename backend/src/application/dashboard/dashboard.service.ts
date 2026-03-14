import { Injectable } from '@nestjs/common';
import { PrismaService } from '@infrastructure/prisma/prisma.service';

export type DashboardPeriod = 'day' | 'month';

export interface AttendancePoint {
  label: string;
  period: string; // YYYY-MM ou YYYY-MM-DD
  total: number;
  delivered: number;
  pending: number;
}

export interface FinancialPoint {
  label: string;
  period: string;
  revenue: number;
  orderCount: number;
}

@Injectable()
export class DashboardService {
  private readonly client: any;

  constructor(private readonly prisma: PrismaService) {
    this.client = this.prisma.client;
  }

  async getAttendanceStats(
    period: DashboardPeriod = 'month',
    from?: string,
    to?: string,
  ): Promise<AttendancePoint[]> {
    const { start, end } = this.getDateRange(period, from, to);
    const orders = await this.client.order.findMany({
      where: {
        createdAt: { gte: start, lte: end },
      },
      select: { createdAt: true, status: true },
      orderBy: { createdAt: 'asc' },
    });

    const allKeys = this.getAllPeriodKeys(period, start, end);
    const grouped: Record<string, { total: number; delivered: number; pending: number }> = {};
    for (const key of allKeys) {
      grouped[key] = { total: 0, delivered: 0, pending: 0 };
    }
    for (const o of orders) {
      const key = this.periodKey(period, o.createdAt);
      if (!grouped[key]) grouped[key] = { total: 0, delivered: 0, pending: 0 };
      grouped[key].total += 1;
      if (o.status === 'DELIVERED') grouped[key].delivered += 1;
      else grouped[key].pending += 1;
    }

    return this.toAttendanceSeries(period, grouped);
  }

  async getFinancialStats(
    period: DashboardPeriod = 'month',
    from?: string,
    to?: string,
  ): Promise<FinancialPoint[]> {
    const { start, end } = this.getDateRange(period, from, to);
    const allKeys = this.getAllPeriodKeys(period, start, end);
    const grouped: Record<string, { revenue: number; orderCount: number }> = {};
    for (const key of allKeys) {
      grouped[key] = { revenue: 0, orderCount: 0 };
    }

    const orders = await this.client.order.findMany({
      where: {
        createdAt: { gte: start, lte: end },
        status: 'DELIVERED',
      },
      include: { items: true },
      orderBy: { createdAt: 'asc' },
    });
    for (const order of orders) {
      const key = this.periodKey(period, order.createdAt);
      if (!grouped[key]) grouped[key] = { revenue: 0, orderCount: 0 };
      const revenue = order.items.reduce(
        (acc: number, i: any) => acc + i.quantity * i.unitPrice,
        0,
      );
      grouped[key].revenue += revenue;
      grouped[key].orderCount += 1;
    }

    return this.toFinancialSeries(period, grouped);
  }

  async getAttendanceSummary(from?: string, to?: string): Promise<{
    totalOrders: number;
    deliveredOrders: number;
    pendingOrders: number;
    lastPeriodLabel: string;
  }> {
    const { start, end } = this.getDateRange('month', from, to);
    const orders = await this.client.order.findMany({
      where: { createdAt: { gte: start, lte: end } },
      select: { status: true },
    });
    const delivered = orders.filter((o: any) => o.status === 'DELIVERED').length;
    return {
      totalOrders: orders.length,
      deliveredOrders: delivered,
      pendingOrders: orders.length - delivered,
      lastPeriodLabel: this.formatPeriodLabel('month', end),
    };
  }

  async getFinancialSummary(from?: string, to?: string): Promise<{
    totalRevenue: number;
    orderCount: number;
    lastPeriodLabel: string;
  }> {
    const { start, end } = this.getDateRange('month', from, to);
    const orders = await this.client.order.findMany({
      where: { createdAt: { gte: start, lte: end }, status: 'DELIVERED' },
      include: { items: true },
    });
    let totalRevenue = 0;
    for (const order of orders) {
      totalRevenue += order.items.reduce(
        (acc: number, i: any) => acc + i.quantity * i.unitPrice,
        0,
      );
    }
    return {
      totalRevenue,
      orderCount: orders.length,
      lastPeriodLabel: this.formatPeriodLabel('month', end),
    };
  }

  private getDateRange(
    period: DashboardPeriod,
    from?: string,
    to?: string,
  ): { start: Date; end: Date } {
    const end = to ? new Date(to) : new Date();
    let start: Date;
    if (from) {
      start = new Date(from);
    } else if (period === 'day') {
      start = new Date(end);
      start.setDate(start.getDate() - 7);
    } else {
      start = new Date(end);
      start.setMonth(start.getMonth() - 6);
    }
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);
    return { start, end };
  }

  private periodKey(period: DashboardPeriod, date: Date): string {
    const d = new Date(date);
    if (period === 'day') {
      return d.toISOString().slice(0, 10);
    }
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
  }

  private getAllPeriodKeys(period: DashboardPeriod, start: Date, end: Date): string[] {
    const keys: string[] = [];
    const cur = new Date(start);
    cur.setHours(0, 0, 0, 0);
    const endDate = new Date(end);
    endDate.setHours(0, 0, 0, 0);
    while (cur <= endDate) {
      keys.push(this.periodKey(period, cur));
      if (period === 'day') {
        cur.setDate(cur.getDate() + 1);
      } else {
        cur.setMonth(cur.getMonth() + 1);
      }
    }
    return keys;
  }

  private formatPeriodLabel(period: DashboardPeriod, date: Date): string {
    const d = new Date(date);
    if (period === 'day') {
      return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
    }
    return d.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
  }

  private toAttendanceSeries(
    period: DashboardPeriod,
    grouped: Record<string, { total: number; delivered: number; pending: number }>,
  ): AttendancePoint[] {
    const months = [
      'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez',
    ];
    const entries = Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b));
    return entries.map(([periodKey, v]) => {
      let label: string;
      if (period === 'day') {
        const [y, m, d] = periodKey.split('-').map(Number);
        label = `${d}/${m}`;
      } else {
        const [, m] = periodKey.split('-').map(Number);
        label = months[m - 1];
      }
      return {
        label,
        period: periodKey,
        total: v.total,
        delivered: v.delivered,
        pending: v.pending,
      };
    });
  }

  private toFinancialSeries(
    period: DashboardPeriod,
    grouped: Record<string, { revenue: number; orderCount: number }>,
  ): FinancialPoint[] {
    const months = [
      'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez',
    ];
    const entries = Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b));
    return entries.map(([periodKey, v]) => {
      let label: string;
      if (period === 'day') {
        const [y, m, d] = periodKey.split('-').map(Number);
        label = `${d}/${m}`;
      } else {
        const [, m] = periodKey.split('-').map(Number);
        label = months[m - 1];
      }
      return {
        label,
        period: periodKey,
        revenue: Math.round(v.revenue * 100) / 100,
        orderCount: v.orderCount,
      };
    });
  }
}
