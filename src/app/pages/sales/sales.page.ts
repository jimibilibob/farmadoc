/* eslint-disable curly */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faFileInvoice } from '@fortawesome/free-solid-svg-icons';
import { of, Subscription } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Invoice, TYPE } from 'src/app/models';
import { InvoiceService, ItemService } from 'src/app/services';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.page.html',
  styleUrls: ['./sales.page.scss'],
})
export class SalesPage implements OnInit, OnDestroy {

  showSearchBar = false;
  invoiceIcon = faFileInvoice;
  sales: Invoice[];
  filteredSales: Invoice[];
  subs = new Subscription();

  constructor(
    private router: Router,
    private invoiceService: InvoiceService,
    private itemService: ItemService
  ) {}

  async ngOnInit() {
    await this.getInvoices();
    this.subs.add(this.invoicesSub());
  }

  async ngOnDestroy() {
    this.subs.unsubscribe();
  }

  async getInvoices(event?: any) {
    await this.invoiceService.getInvoicesByType(TYPE.sales);
    if (event) event.target.complete();
  }

  search(event: any) {
    const $inputSub = of(event.detail.value)
    .pipe(catchError(error =>
      of('')
      ),
      map( (word: string) =>
         this.filteredSales = this.invoiceService.searchInvoices(this.sales, word)
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
    this.itemService.setIsSale(true);
    this.router.navigate(['/sale-form']);
  }

  private invoicesSub() {
    return this.invoiceService.getInvoicesObservable().subscribe( res => {
      console.log('FACTURAS:', res);
      this.sales = res;
      this.filteredSales = res;
    });
  }
}
