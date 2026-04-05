export interface ProductAddon {
  uuid: string;
  name: string;
  extraPrice: number;
  active?: boolean;
  sortOrder?: number;
}

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
  /** Opcionais com valor extra (vazio = produto sem adicionais) */
  addons?: ProductAddon[];
  category?: {
    uuid: string;
    name: string;
  };
}