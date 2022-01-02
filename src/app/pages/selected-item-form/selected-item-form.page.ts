/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


import { Invoice, InvoiceItems, Item } from 'src/app/models';
import { InvoiceService, ItemService } from 'src/app/services';

@Component({
  selector: 'app-selected-item-form',
  templateUrl: './selected-item-form.page.html',
  styleUrls: ['./selected-item-form.page.scss'],
})
export class SelectedItemFormPage implements OnInit, OnDestroy {

  selectedInvoice: Invoice;
  selectedItem: Item;
  selectedItemForm: FormGroup;
  calendarIcon = faCalendarDay;
  subs: Subscription;

  constructor(
    private router: Router,
    private itemService: ItemService,
    private invoiceService: InvoiceService
  ) {
    this.subs = new Subscription();
    this.selectedItemForm = new FormGroup({
      units: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^([0-9]{1,5})$')
      ])),
      price: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^([0-9]{0,4}((.|,)[0-9]{0,2}))$')
      ])),
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
      price: this.selectedItem.price,
      units: null,
      sale_price: this.selectedItem.price
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  addSelectedItem() {
    if (this.selectedItemForm.invalid) {
      return Object.values(this.selectedItemForm.controls).forEach(
        formControl => {
          formControl.markAsTouched();
        });
    }
    const formValue = this.selectedItemForm.value;
    let newInvoiceItems = this.selectedItem.castToInvoiceItems();
    newInvoiceItems = new InvoiceItems({
      ... newInvoiceItems,
      units: formValue.units,
      price: formValue.price
    });
    this.selectedInvoice.addItem(newInvoiceItems);
    this.invoiceService.setSelectedInvoice(this.selectedInvoice);
    this.router.navigate(['/invoice-creation']);
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
