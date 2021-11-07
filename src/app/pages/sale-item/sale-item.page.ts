/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Invoice, InvoiceItems, Item } from 'src/app/models';
import { InvoiceService, ItemService } from 'src/app/services';

@Component({
  selector: 'app-sale-item',
  templateUrl: './sale-item.page.html',
  styleUrls: ['./sale-item.page.scss'],
})
export class SaleItemPage implements OnInit, OnDestroy {

  selectedInvoice: Invoice;
  selectedItem: Item;
  selectedItemForm: FormGroup;
  calendarIcon = faCalendarDay;
  subs: Subscription;

  constructor(
    private router: Router,
    private itemService: ItemService,
    private invoiceService: InvoiceService,
    private alertController: AlertController
  ) {
    this.subs = new Subscription();
    this.selectedItemForm = new FormGroup({
      units: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^([0-9]{1,5})$')
      ])),
      // price: new FormControl('', Validators.compose([
      //   Validators.required,
      //   Validators.pattern('^([0-9]{0,4}((.|,)[0-9]{0,2}))$')
      // ])),
      sale_price: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^([0-9]{0,4}((.|,)[0-9]{0,2}))$')
      ]))
    });
  }

  ngOnInit() {
    this.subs.add(this.addItemSub());
    this.subs.add(this.addInvoiceSub());
    this.selectedItemForm.setValue({
      // price: this.selectedItem.price,
      units: null,
      sale_price: this.selectedItem.sale_price
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  async addSelectedItem() {
    if (this.selectedItemForm.invalid) {
      return Object.values(this.selectedItemForm.controls).forEach(
        formControl => {
          formControl.markAsTouched();
        });
    } else {
      if (this.selectedItemForm.value.sale_price < (this.selectedItem.sale_price - 5)) {
        const alert = await this.alertController.create({
          message: `El precio de venta no puede ser menor que ${this.selectedItem.sale_price - 5} BS`,
          buttons: [
            {
              text: 'OK',
              role: 'cancel',
              handler: () => null
            }
          ]
        });
        await alert.present();
        return;
      }
      const formValue = this.selectedItemForm.value;
      console.log('SelectedItem', this.selectedItem);
      console.log('Form Value', formValue);
      let newInvoiceItems = this.selectedItem.castToInvoiceItems();
      console.log('NewInvoiceItems addSelectedItem:', newInvoiceItems);
      newInvoiceItems = new InvoiceItems({
        ... newInvoiceItems,
        units: formValue.units,
        sale_price: formValue.sale_price
      });
      console.log('newInvoiceItems InvoiceItems():', newInvoiceItems);
      this.selectedInvoice.addItem(newInvoiceItems);
      this.invoiceService.setSelectedInvoice(this.selectedInvoice);
      this.router.navigate(['/sale-form']);
    }
  }

  private addItemSub(): Subscription {
    return this.itemService.getItemObservable().subscribe( item => {
      this.selectedItem = item;
    });
  }

  private addInvoiceSub(): Subscription {
    return this.invoiceService.getSelectedInvoiceObservable().subscribe( invoice => {
      this.selectedInvoice = invoice;
    });
  }

}
