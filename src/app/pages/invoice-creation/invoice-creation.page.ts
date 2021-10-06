import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { faCalendarDay, faPills } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { Invoice, InvoiceItems } from 'src/app/models';
import { InvoiceService, NavService } from 'src/app/services';

@Component({
  selector: 'app-invoice-creation',
  templateUrl: './invoice-creation.page.html',
  styleUrls: ['./invoice-creation.page.scss'],
})
export class InvoiceCreationPage implements OnInit, OnDestroy {

  invoiceForm: FormGroup;
  selectedInvoice: Invoice;
  subs: Subscription;
  itemIcon = faPills;
  calendarIcon = faCalendarDay;

  constructor(
    private router: Router,
    private navService: NavService,
    private invoiceService: InvoiceService
  ) {
    this.selectedInvoice = new Invoice();
    this.subs = new Subscription();
    this.invoiceForm = new FormGroup({
      name: new FormControl('')
    });
  }

  ngOnInit() {
    this.subs.add(this.invoiceSub());
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  async createInvoice() {
    if (this.invoiceForm.invalid) {
      return Object.values(this.invoiceForm.controls).forEach(
        formControl => {
          formControl.markAsTouched();
        });
    } else {
      this.invoiceForm.value.exp_date = new Date(this.invoiceForm.value.exp_date);
      this.selectedInvoice.name = this.invoiceForm.value.name;
      await this.invoiceService.storeInvoice(this.selectedInvoice);
      this.router.navigate(['/invoices']);
    }
  }

  goToItems() {
    this.navService.pushToNextScreenWithParams('/items', 'Seleccione un Producto');
  }

  removeInvoiceItems(invoiceItem: InvoiceItems) {
    this.selectedInvoice.removeItem(invoiceItem);
    this.invoiceService.setSelectedInvoice(this.selectedInvoice);
  }

  private invoiceSub(): Subscription {
    return this.invoiceService.getSelectedInvoiceObservable().subscribe( res => {
      console.log(res);
      this.selectedInvoice = res;
      this.selectedInvoice.updateTotal();
    });
  }

}
