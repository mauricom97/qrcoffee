export class UpdateProductDTO {
    name?: string;
    price?: string;
    active?: boolean;
    description?: string;
    stock?: number;
    categoryUuid?: string;
    isKitchenProduct?: boolean;
}