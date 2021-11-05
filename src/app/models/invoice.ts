import { InvoiceItems } from '.';

export enum TYPE {
  'sales' = 1,
  'purchases' = 2
}

/* eslint-disable @typescript-eslint/naming-convention */
export class Invoice {
  id?: number;
  name: string;
  total: number;
  items: InvoiceItems[];
  type_id: TYPE;
  created_at: Date;
  invoice_number: string;
  user_id?: string;

  constructor(attributes?: any, matchData?: boolean) {
    if (attributes) {
      if (matchData) {
        this.init();
        for (const key in this) {
          if (this.hasOwnProperty(key) && attributes.hasOwnProperty(key)) {
            if (key === 'items') {
              this[key] = attributes[key].map( item => new InvoiceItems(item, true));
            } else {
              this[key] = attributes[key];
            }
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

  removeItem(item: InvoiceItems) {
    const index = this.items.indexOf(item);
    if (index > -1) {
      this.items.splice(index, 1);
    }
  }

  addItem(newItem: InvoiceItems) {
    console.log('Sub ITEM invoice ts:', newItem.discount);
    const price = (this.type_id === TYPE.purchases) ? newItem.price : newItem.sale_price;
    newItem.total_sub = (newItem.discount == null || newItem.discount <= 0) ?
      (price * newItem.units) : (price * newItem.units) * (newItem.discount / 100);
    this.items.push(newItem);
  }

  updateTotal() {
    this.total = 0;
    this.items.map( item => {
      console.log('Sub total:', item.total_sub);
      this.total = this.total + item.total_sub;
    });
  }

  purgeAttr() {
    delete this.id;
    delete this.items;
    delete this.created_at;
  }

  setType(type: TYPE) {
    this.type_id = type;
  }

  private init() {
    this.id = 0;
    this.name = '';
    this.total = 0;
    this.created_at = new Date();
    this.items = [];
    this.invoice_number = '';
    this.type_id = TYPE.purchases;
  }
}
