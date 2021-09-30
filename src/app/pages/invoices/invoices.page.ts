/* eslint-disable curly */
import { Component, OnInit } from '@angular/core';
import {faFileInvoice} from '@fortawesome/free-solid-svg-icons';
import { of, Subscription } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Invoice } from 'src/app/models';
import { NavService, SupabaseService } from 'src/app/services';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.page.html',
  styleUrls: ['./invoices.page.scss'],
})
export class InvoicesPage implements OnInit {

  showSearchBar: boolean;
  invoices: Invoice[];
  filteredInvoices: Invoice[];
  invoiceIcon = faFileInvoice;
  subs: Subscription;

  constructor(
    private navService: NavService,
    private supabaseService: SupabaseService
  ) {
    this.showSearchBar = false;
    this.subs = new Subscription();
  }

  async ngOnInit() {
    await this.getInvoices();
    this.subs.add(this.invoicesSub());
  }

  async getInvoices(event?: any) {
    await this.supabaseService.getInvoices();
    if (event) event.target.complete();
  }

  search(event: any) {
    const $inputSub = of(event.detail.value)
    .pipe(catchError(error =>
      of('')
      ),
      map( (word: string) => {
        word = word.toLowerCase();
        return this.filteredInvoices = this.invoices.filter( inv =>
          inv.name.toLocaleLowerCase().includes(word) ); // Look for InvoiceItems too
      }),
      debounceTime(1000),
      distinctUntilChanged())
      .subscribe(console.log);
    this.subs.add($inputSub);
  }

  goToInvoiceForm(invoice: any) {
    this.supabaseService.setSelectedInvoice(invoice);
    this.navService.pushToNextScreenWithParams('/invoice', 'Editar Factura');
  }

  private invoicesSub() {
    this.supabaseService.getInvoicesObservable().subscribe( res => {
      console.log('FACTURAS:', res);
      this.invoices = res;
      this.filteredInvoices = res;
    });
  }
}
