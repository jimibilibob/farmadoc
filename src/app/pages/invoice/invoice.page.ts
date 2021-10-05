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
  buttonLabel: string;
  isInfo: boolean;
  pageName: any;
  itemIcon = faPills;
  calendarIcon = faCalendarDay;

  constructor(
    private router: Router,
    private navService: NavService,
    private invoiceService: InvoiceService,
    private itemService: ItemService
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

  private itemSub(): Subscription {
    return this.itemService.getItemObservable().subscribe( item => {
      this.selectedItem = item;
      // TODO: Cast item into InvoiceItems type and add it to invoice.items
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
