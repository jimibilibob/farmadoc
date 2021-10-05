import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { faCalendarDay, faPills } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { Invoice } from 'src/app/models';
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
  buttonLabel: string;
  isInfo: boolean;
  pageName: any;
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
    this.navService.pushToNextScreenWithParams('/items', 'Seleccione un Producto');
  }

  private invoiceSub(): Subscription {
    return this.invoiceService.getSelectedInvoiceObservable().subscribe( res => {
      console.log(res);
      this.selectedInvoice = res;
    });
  }

  private setTitle() {
    const navParams = this.router.getCurrentNavigation().extras.state;
    if (navParams) {
      this.pageName = navParams;
      this.isInfo = true;
      this.buttonLabel = 'Guardar Cambios';
    } else {
      this.pageName = 'Agregar Nueva Factura';
      this.isInfo = false;
      this.buttonLabel = 'Agregar Factura';
    }
  }

}