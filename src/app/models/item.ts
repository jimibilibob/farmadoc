/* eslint-disable @typescript-eslint/naming-convention */
export class Item {
  id: number;
  generic_name: string;
  commercial_name: string;
  price: number;
  description: string;
  provider: string;
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

  addUserId(userId: string) {
    this.user_id = userId;
  }

  private init() {
    this.id = 0;
    this.generic_name = '';
    this.commercial_name = '';
    this.price = 0;
    this.description = '';
    this.provider = '';
    this.exp_date = null;
  }
}
