/* eslint-disable curly */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faFileInvoice } from '@fortawesome/free-solid-svg-icons';
import { of, Subscription } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Invoice, TYPE } from 'src/app/models';
import { InvoiceService } from 'src/app/services';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.page.html',
  styleUrls: ['./purchases.page.scss'],
})
export class PurchasesPage implements OnInit, OnDestroy {

  showSearchBar = false;
  invoices: Invoice[];
  filteredInvoices: Invoice[];
  invoiceIcon = faFileInvoice;
  subs: Subscription;

  constructor(
    private router: Router,
    private invoiceService: InvoiceService
  ) {
    this.subs = new Subscription();
  }

  async ngOnInit() {
    await this.getInvoices();
    this.subs.add(this.invoicesSub());
  }

  async ngOnDestroy() {
    this.subs.unsubscribe();
  }

  async getInvoices(event?: any) {
    await this.invoiceService.getInvoicesByType(TYPE.purchases);
    if (event) event.target.complete();
  }

  search(event: any) {
    const $inputSub = of(event.detail.value)
    .pipe(catchError(error =>
      of('')
      ),
      map( (word: string) =>
         this.filteredInvoices = this.invoiceService.searchInvoices(this.invoices, word)
      ),
      debounceTime(1000),
      distinctUntilChanged())
      .subscribe(console.log);
    this.subs.add($inputSub);
  }

  goToInvoiceDetails(invoice: any) {
    this.invoiceService.setSelectedInvoice(invoice);
    this.router.navigate(['/invoice-details']);
  }

  goToInvoiceForm() {
    this.invoiceService.setSelectedInvoice(new Invoice());
    this.router.navigate(['/invoice-creation']);
  }

  private invoicesSub() {
    return this.invoiceService.getInvoicesObservable().subscribe( res => {
      console.log('FACTURAS:', res);
      this.invoices = res;
      this.filteredInvoices = res;
    });
  }
}
