export class ProductWithCategoryDto {
  uuid?: string;
  name?: string;
  price?: number;
  active?: boolean;
  description?: string;
  categoryUuid?: string;
  category?: {
    uuid?: string;
    name?: string;
  };
}
