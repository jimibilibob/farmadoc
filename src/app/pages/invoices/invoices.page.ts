import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.page.html',
  styleUrls: ['./invoices.page.scss'],
})
export class InvoicesPage implements OnInit {

  showSearchBar: boolean;
  filteredInvoices: any[];

  constructor() {
    this.showSearchBar = false;
  }

  ngOnInit() {
  }

  getInvoices(event?: any) {

  }

  search(event: Event) {

  }

  goToInvoiceForm(invoice: any) {

  }
}
