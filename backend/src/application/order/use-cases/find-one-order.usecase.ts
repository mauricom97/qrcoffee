import { OrderRepository, OrderListDto } from '@domain/order/repositories/order.repository';

export class FindOneOrderUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(uuid: string, companyUuid?: string): Promise<OrderListDto | null> {
    return await this.orderRepository.findById(uuid, companyUuid);
  }
}
