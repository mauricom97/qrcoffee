import { OrderRepository } from '@domain/order/repositories/order.repository';

export class DeleteOrderUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(uuid: string): Promise<void> {
    await this.orderRepository.destroy(uuid);
  }
}
