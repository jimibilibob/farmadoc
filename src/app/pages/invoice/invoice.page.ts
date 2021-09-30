import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { faPills } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/services';
import { Invoice } from 'src/app/models';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.page.html',
  styleUrls: ['./invoice.page.scss'],
})
export class InvoicePage implements OnInit, OnDestroy {

  invoiceForm: FormGroup;
  selectedInvoice: Invoice;
  subs: Subscription;
  buttonLabel: string;
  isEdition: boolean;
  pageName: any;
  itemIcon = faPills;

  constructor(
    private router: Router,
    private supabaseService: SupabaseService
  ) {
    this.subs = new Subscription();
    this.invoiceForm = new FormGroup({
      name: new FormControl(''),
      items: new FormControl(''),
    });
  }

  ngOnInit() {
    this.setTitle();
    this.subs.add(this.invoiceSub());
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  createOrUpdateInvoice() {

  }

  goToItems() {
    this.router.navigate(['/items']);
  }

  private invoiceSub(): Subscription {
    return this.supabaseService.getSelectedInvoiceObservable().subscribe( res => {
      console.log(res);
      this.selectedInvoice = res;
    });
  }

  private setTitle() {
    const navParams = this.router.getCurrentNavigation().extras.state;
    if (navParams) {
      this.pageName = navParams;
      this.isEdition = true;
      this.buttonLabel = 'Guardar Cambios';
    } else {
      this.pageName = 'Agregar Nueva Factura';
      this.isEdition = false;
      this.buttonLabel = 'Agregar Factura';
    }
  }
}
