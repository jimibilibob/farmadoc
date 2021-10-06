/* eslint-disable @typescript-eslint/naming-convention */
import { Item } from '.';

interface Details {
  commercial_name: string;
  generic_name: string;
  description: string;
}

export class InvoiceItems {
  id?: number;
  invoice_id?: string;
  item: Item;
  price: number;
  discount: number;
  units: number;
  total_sub: number;
  details: Details;
  user_id?: string;

  constructor(attributes?: any, matchData?: boolean) {
    if (attributes) {
      if (matchData) {
        this.init();
        for (const key in this) {
          if (this.hasOwnProperty(key) && attributes.hasOwnProperty(key)) {
            this[key] = attributes[key];
          } else {
            delete this[key];
          }
        }
      } else {
        Object.assign(this, attributes);
      }
    } else {
      this.init();
    }
  }

  addUserId(userId: string) {
    this.user_id = userId;
  }

  private init() {
    this.id = 0;
    this.invoice_id = '';
    this.item = new Item();
    this.price = 0;
    this.discount = 0;
    this.units = 0;
    this.total_sub = null;
    this.details = null;
  }
}
