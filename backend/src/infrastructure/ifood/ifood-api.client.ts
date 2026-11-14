import { Injectable, Logger } from '@nestjs/common';
import { getIfoodConfig } from './ifood-config';

export type IfoodOrderItem = {
  id?: string;
  name?: string;
  quantity: number;
  unitPrice?: number;
  price?: number;
  externalCode?: string;
  observations?: string;
  options?: { name?: string; price?: number; externalCode?: string }[];
};

export type IfoodOrderDetails = {
  id: string;
  displayId?: string;
  merchant?: { id?: string };
  items: IfoodOrderItem[];
  observations?: string;
  extraInfo?: string;
};

@Injectable()
export class IfoodApiClient {
  private readonly logger = new Logger(IfoodApiClient.name);

  async getOrder(orderId: string, accessToken: string): Promise<IfoodOrderDetails> {
    const { apiBaseUrl } = getIfoodConfig();
    const url = `${apiBaseUrl}/order/v1.0/orders/${encodeURIComponent(orderId)}`;
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
      },
    });
    if (!res.ok) {
      const body = await res.text().catch(() => '');
      this.logger.error(`getOrder ${orderId} failed: ${res.status} ${body}`);
      throw new Error(`Falha ao buscar pedido iFood (${res.status})`);
    }
    const data = (await res.json()) as any;
    return this.normalizeOrder(data);
  }

  async confirmOrder(orderId: string, accessToken: string): Promise<void> {
    const { apiBaseUrl } = getIfoodConfig();
    const url = `${apiBaseUrl}/order/v1.0/orders/${encodeURIComponent(orderId)}/confirm`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: '{}',
    });
    if (!res.ok && res.status !== 409) {
      const body = await res.text().catch(() => '');
      this.logger.error(`confirmOrder ${orderId} failed: ${res.status} ${body}`);
      throw new Error(`Falha ao confirmar pedido iFood (${res.status})`);
    }
  }

  private normalizeOrder(data: any): IfoodOrderDetails {
    const itemsRaw = Array.isArray(data?.items) ? data.items : [];
    const items: IfoodOrderItem[] = itemsRaw.map((it: any) => {
      const unit =
        typeof it.unitPrice === 'number'
          ? it.unitPrice
          : typeof it.price?.value === 'number'
            ? it.price.value
            : typeof it.totalPrice?.value === 'number' && it.quantity
              ? it.totalPrice.value / it.quantity
              : Number(it.price) || 0;
      return {
        id: it.id,
        name: it.name,
        quantity: Number(it.quantity) || 1,
        unitPrice: unit,
        externalCode: it.externalCode ?? it.external_code ?? undefined,
        observations: it.observations,
        options: Array.isArray(it.options)
          ? it.options.map((o: any) => ({
              name: o.name,
              price: typeof o.price === 'number' ? o.price : Number(o.price?.value) || 0,
              externalCode: o.externalCode,
            }))
          : undefined,
      };
    });
    return {
      id: String(data.id ?? data.orderId ?? ''),
      displayId: data.displayId,
      merchant: data.merchant,
      items,
      observations: data.observations ?? data.extraInfo,
      extraInfo: data.extraInfo,
    };
  }
}
