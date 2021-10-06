import { InvoiceItems, Item } from '.';

/* eslint-disable @typescript-eslint/naming-convention */
export class Invoice {
  id?: number;
  name: string;
  total: number;
  items: InvoiceItems[];
  created_at: Date;
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
    newItem.total_sub = (newItem.discount == null || newItem.discount <= 0) ?
      (newItem.price * newItem.units) : (newItem.price * newItem.units) * (newItem.discount / 100);
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

  private init() {
    this.id = 0;
    this.name = '';
    this.total = 0;
    this.created_at = new Date();
    this.items = [];
  }
}
