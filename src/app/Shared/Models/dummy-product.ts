export interface DummyProduct {
  id:number,
  title:string,
  description:string,
  price:number,
  images:string[],
  category:string,
}
export interface dummyResponse{
  products:DummyProduct[];
}

