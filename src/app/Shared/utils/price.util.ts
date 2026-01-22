
export function priceToNumber(price:string| number): number{

  if(typeof price==='number') return price;
  // Remove non-numeric characters except decimal point
  return parseFloat(price.replace(/[^0-9.]/g, '')) || 0;
}
