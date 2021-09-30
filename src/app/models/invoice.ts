import { InvoiceItems } from '.';

/* eslint-disable @typescript-eslint/naming-convention */
export class Invoice {
  id: number;
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

  addItems(invoiceItems: InvoiceItems[]) {
    this.items = invoiceItems;
  }

  addUserId(userId: string) {
    this.user_id = userId;
  }

  private init() {
    this.id = 0;
    this.name = '';
    this.total = 0;
    this.created_at = new Date();
    this.items = [];
  }
}