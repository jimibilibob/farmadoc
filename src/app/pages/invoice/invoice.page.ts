import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.page.html',
  styleUrls: ['./invoice.page.scss'],
})
export class InvoicePage implements OnInit {

  invoiceForm: FormGroup;
  buttonLabel: string;

  constructor() { }

  ngOnInit() {
  }

  createOrUpdateInvoice() {

  }
}
