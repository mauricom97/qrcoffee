import type { ProductAddonInput } from '@domain/product/types/product-addon-input';

export class UpdateProductDTO {
    name?: string;
    price?: string;
    active?: boolean;
    description?: string;
    stock?: number;
    categoryUuid?: string;
    isKitchenProduct?: boolean;
    /** Código do item no cardápio iFood (externalCode); null limpa */
    ifoodExternalCode?: string | null;
    /** Se enviado, substitui a lista de adicionais do produto (use [] para remover todos) */
    addons?: ProductAddonInput[];
}