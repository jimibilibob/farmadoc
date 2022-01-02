import { Component, OnDestroy, OnInit } from '@angular/core';
import { faPills, faCalendarDay, faFileInvoice } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';


import { Invoice, Item, TYPE } from 'src/app/models';
import { InvoiceService } from 'src/app/services';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice-details.page.html',
  styleUrls: ['./invoice-details.page.scss'],
})
export class InvoiceDetailsPage implements OnInit, OnDestroy {

  invoiceForm: FormGroup;
  selectedInvoice: Invoice;
  selectedItem: Item;
  subs: Subscription;
  invoiceIcon = faFileInvoice;
  calendarIcon = faCalendarDay;
  itemIcon = faPills;
  invoiceType = TYPE;

  constructor(
    private invoiceService: InvoiceService,
  ) {
    this.selectedInvoice = new Invoice();
    this.subs = new Subscription();
    this.invoiceForm = new FormGroup({
      name: new FormControl(''),
      items: new FormControl(''),
    });
  }

  ngOnInit() {
    this.subs.add(this.invoiceSub());
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  private invoiceSub(): Subscription {
    return this.invoiceService.getSelectedInvoiceObservable().subscribe( res => {
      console.log(res);
      this.selectedInvoice = res;
    });
  }
}
