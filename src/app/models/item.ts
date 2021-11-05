import { InvoiceItems, TYPE } from '.';

/* eslint-disable @typescript-eslint/naming-convention */
export class Item {
  id: number;
  generic_name: string;
  commercial_name: string;
  price: number;
  sale_price: number;
  description: string;
  laboratory: string;
  exp_date: string;
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

  castToInvoiceItems(): InvoiceItems {
    return new InvoiceItems({
      item_id: this.id,
      price:  this.price,
      sale_price: this.sale_price,
      details: {
        commercial_name: this.commercial_name,
        generic_name: this.generic_name,
        description: this.description
      }
    }, true);
  }

  addUserId(userId: string) {
    this.user_id = userId;
  }

  private init() {
    this.id = 0;
    this.generic_name = '';
    this.commercial_name = '';
    this.price = 0;
    this.sale_price = 0;
    this.description = '';
    this.laboratory = '';
    this.exp_date = null;
  }
}
