/* eslint-disable curly */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faFileInvoice } from '@fortawesome/free-solid-svg-icons';
import { of, Subscription } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Invoice } from 'src/app/models';
import { InvoiceService, NavService } from 'src/app/services';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.page.html',
  styleUrls: ['./invoices.page.scss'],
})
export class InvoicesPage implements OnInit, OnDestroy {

  showSearchBar: boolean;
  invoices: Invoice[];
  filteredInvoices: Invoice[];
  invoiceIcon = faFileInvoice;
  subs: Subscription;

  constructor(
    private navService: NavService,
    private router: Router,
    private invoiceService: InvoiceService
  ) {
    this.showSearchBar = false;
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
    await this.invoiceService.getInvoices();
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
    this.router.navigate(['/invoice']);
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
