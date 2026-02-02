// interfaces/product/dto/create-product.dto.ts
export class CreateProductDto {
  uuid: string;
  name: string;
  price: number;
  active: boolean;
  description: string;
  categoryUuid: string
}
  