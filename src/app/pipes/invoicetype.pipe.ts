import { Pipe, PipeTransform } from '@angular/core';
import { TYPE } from '../models';

@Pipe({
  name: 'invoicetype'
})
export class InvoicetypePipe implements PipeTransform {

  transform(value: number): string {
    let stateClass = '';
    console.log(value);
    switch (value) {
      case TYPE.purchases:
        stateClass = 'purchase';
        break;
      case TYPE.sales:
        stateClass = 'sale';
        break;
      default:
        break;
    }
    console.log(stateClass);
    return stateClass;
  }

}
