import { CartItem } from "app/public/cart/cart-item";

export interface Order {
  id:number;
  items:CartItem[];
  totalPrice:number;
  date:string;
  status: typeof orderStatus.Pending
}
export const  orderStatus={
  Pending:'Pending',
  Shipped:'Shipped',
  Delivered:'Delivered'
}
