import { OrderRepository, OrderListDto } from '@domain/order/repositories/order.repository';

export interface FindOrderFilters {
  tableUuid?: string;
  status?: string;
  companyUuid?: string;
}

export class FindAllOrderUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(filters?: FindOrderFilters): Promise<OrderListDto[]> {
    return await this.orderRepository.findAll(filters ?? {});
  }
}
