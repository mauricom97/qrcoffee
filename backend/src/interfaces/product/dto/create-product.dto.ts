import type { ProductAddonInput } from '@domain/product/types/product-addon-input';

export class CreateProductDto {
  uuid?: string;
  name: string;
  price: number;
  active: boolean;
  description: string;
  categoryUuid: string;
  companyUuid: string;
  isKitchenProduct?: boolean;
  /** Código do item no cardápio iFood (externalCode) */
  ifoodExternalCode?: string | null;
  /** Adicionais opcionais (nome + valor extra sobre o preço base) */
  addons?: ProductAddonInput[];
}
  