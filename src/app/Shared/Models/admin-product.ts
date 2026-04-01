export interface AdminProduct {
  id: number;
  name: string;
  price: number;
  stockQuantity: number;
  sold: number;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
}
