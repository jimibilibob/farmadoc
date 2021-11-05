/* eslint-disable @typescript-eslint/naming-convention */

interface Details {
  commercial_name: string;
  generic_name: string;
  description: string;
}

export class InvoiceItems {
  id?: number;
  invoice_id?: number;
  item_id: number;
  price: number;
  sale_price: number;
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

  prepareToStore(invoiceId: number, itemId: number) {
    this.invoice_id = invoiceId;
    this.item_id = itemId;
    delete this.details;
  }

  private init() {
    this.id = 0;
    this.item_id = 0;
    this.invoice_id = 0;
    this.price = 0;
    this.sale_price = 0;
    this.discount = 0;
    this.units = 0;
    this.total_sub = null;
    this.details = null;
  }
}
