import { CartItem } from "app/public/cart/cart-item";

export interface Order {
  id:number;
  items:CartItem[];
  totalPrice:number;
  date:string;
  status: keyof typeof orderStatus;
}
export const  orderStatus={
  Pending:'Pending',
  Shipped:'Shipped',
  Delivered:'Delivered',
  Cancelled:'Cancelled'
} as const
