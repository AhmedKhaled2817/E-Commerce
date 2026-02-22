export interface Products {
  id:number,
  title:string,
  description:string,
  price:number,
  images:string[],
  thumbnail:string,

  mainCategory:mainCategory
  subCategory:string,
}
export type mainCategory= 'Men' | 'Women' | 'Kids'| 'Footwear';
