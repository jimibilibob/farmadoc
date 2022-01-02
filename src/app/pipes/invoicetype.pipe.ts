import { Pipe, PipeTransform } from '@angular/core';
import { TYPE } from '../models';

@Pipe({
  name: 'invoicetype'
})
export class InvoicetypePipe implements PipeTransform {

  transform(value: number): string {
    return STATE_CLASS[value] ?? DEFAULT_VALUE;
  }

}

const STATE_CLASS = {
  1: 'sale',
  2: 'purchase'
};

const DEFAULT_VALUE = '';

