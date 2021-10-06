import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { faPills, faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { InvoiceService, ItemService, NavService } from 'src/app/services';
import { Invoice, Item } from 'src/app/models';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.page.html',
  styleUrls: ['./invoice.page.scss'],
})
export class InvoicePage implements OnInit, OnDestroy {

  invoiceForm: FormGroup;
  selectedInvoice: Invoice;
  selectedItem: Item;
  subs: Subscription;
  itemIcon = faPills;
  calendarIcon = faCalendarDay;

  constructor(
    private navService: NavService,
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

  goToItems() {
    this.navService.pushToNextScreenWithParams('/items', 'Seleccione un Producto');
  }

  private invoiceSub(): Subscription {
    return this.invoiceService.getSelectedInvoiceObservable().subscribe( res => {
      console.log(res);
      this.selectedInvoice = res;
    });
  }
}
