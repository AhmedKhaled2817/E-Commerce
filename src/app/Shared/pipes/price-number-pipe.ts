import { Pipe, PipeTransform } from '@angular/core';
import { priceToNumber } from '../utils/price.util';

@Pipe({
  name: 'priceNumber'
})
export class PriceNumberPipe implements PipeTransform {
  transform(val:string| number): number {
    return priceToNumber(val);
  }
}
