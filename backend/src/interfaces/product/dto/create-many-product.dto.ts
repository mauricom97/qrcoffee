export class CreateManyProductDto extends Array<{
  uuid: string;
  name: string;
  price: number;
  active: boolean;
  description: string;
  categoryUuid: string;
  companyUuid: string;
}> {}

export class CreateProductDto {
  uuid: string;
  name: string;
  price: number;
  active: boolean;
  description: string;
  categoryUuid: string;
}
