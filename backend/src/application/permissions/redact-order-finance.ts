import type { OrderListDto } from '@domain/order/repositories/order.repository';

/** Remove valores de venda dos DTOs quando o usuário não tem ATTENDANCE_FINANCE. */
export function redactOrdersFinancialData(orders: OrderListDto[]): OrderListDto[] {
  return orders.map((order) => ({
    ...order,
    items: order.items.map((it) => ({
      ...it,
      unitPrice: 0,
      addonsSnapshot:
        it.addonsSnapshot?.map((a) => ({ ...a, extraPrice: 0 })) ?? it.addonsSnapshot,
    })),
  }));
}

export function redactOrderFinancialData(order: OrderListDto): OrderListDto {
  const [first] = redactOrdersFinancialData([order]);
  return first ?? order;
}
