export interface Product {
  uuid: string;
  name: string;
  price: number;
  description?: string;
  categoryUuid: string;
  active: boolean;
  images?: string[];
  category?: {
    uuid: string;
    name: string;
  };
}