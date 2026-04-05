export class CreateManyProductDto extends Array<{
  uuid: string;
  name: string;
  price: number;
  active: boolean;
  description: string;
  categoryUuid: string;
  companyUuid: string;
  isKitchenProduct?: boolean;
}> {}

export class CreateProductDto {
  uuid: string;
  name: string;
  price: number;
  active: boolean;
  description: string;
  categoryUuid: string;
  isKitchenProduct?: boolean;
}
