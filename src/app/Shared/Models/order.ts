import { CartItem } from "app/public/cart/cart-item";

export interface Order {
  id:number;
  items:CartItem[];
  totalPrice:number;
  date:string;
}
