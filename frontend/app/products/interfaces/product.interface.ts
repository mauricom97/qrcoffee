export interface Product {
  uuid: string;
  name: string;
  price: number;
  description?: string;
  categoryUuid: string;
  active: boolean;
  /** Exige horário da cozinha no cardápio público */
  isKitchenProduct?: boolean;
  images?: string[];
  category?: {
    uuid: string;
    name: string;
  };
}