/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faCalendarDay, faPills } from '@fortawesome/free-solid-svg-icons';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Invoice, InvoiceItems, TYPE } from 'src/app/models';
import { InvoiceService, LoadingService, NavService } from 'src/app/services';

@Component({
  selector: 'app-sale-form',
  templateUrl: './sale-form.page.html',
  styleUrls: ['./sale-form.page.scss'],
})
export class SaleFormPage implements OnInit, OnDestroy {

  saleForm: FormGroup;
  selectedInvoice: Invoice;
  subs: Subscription;
  itemIcon = faPills;
  calendarIcon = faCalendarDay;

  constructor(
    private loadingService: LoadingService,
    private alertController: AlertController,
    private router: Router,
    private navService: NavService,
    private invoiceService: InvoiceService
  ) {
    this.selectedInvoice = new Invoice();
    console.log(this.selectedInvoice);
    this.subs = new Subscription();
    this.saleForm = new FormGroup({
      name: new FormControl('', Validators.compose([
        Validators.required
      ])),
      invoice_number: new FormControl('', Validators.compose([
        Validators.required
      ]))
    });
  }

  ngOnInit() {
    this.subs.add(this.invoiceSub());
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  async createInvoice() {
    if (this.saleForm.invalid) {
      return Object.values(this.saleForm.controls).forEach(
        formControl => {
          formControl.markAsTouched();
        });
    } else {
      await this.loadingService.presentLoading('Cargando, espere por favor...');
      this.saleForm.value.exp_date = new Date(this.saleForm.value.exp_date);
      this.selectedInvoice.name = this.saleForm.value.name;
      this.selectedInvoice.invoice_number = this.saleForm.value.invoice_number;
      await this.invoiceService.storeInvoice(this.selectedInvoice);
      await this.router.navigate(['/sales']);
      await this.loadingService.dismissLoading();
    }
  }

  goToItems() {
    this.navService.pushToNextScreenWithParams('/items', 'Seleccione un Producto');
  }

  async removeInvoiceItems(invoiceItem: InvoiceItems) {
    const alert = await this.alertController.create({
      // cssClass: 'alert-class',
      // header: 'Invoice',
      message: `Está seguro que desea eliminar <strong>${invoiceItem.details.commercial_name.toLocaleUpperCase()}</strong> 
      de la lista de productos?`,
      buttons: [
        {
          text: 'CANCELAR',
          role: 'cancel',
          // cssClass: 'secondary',
          handler: () => null
        }, {
          text: 'CONFIRMAR',
          handler: () => {
            this.selectedInvoice.removeItem(invoiceItem);
            this.invoiceService.setSelectedInvoice(this.selectedInvoice);
          }
        }
      ]
    });
    await alert.present();
  }

  private invoiceSub(): Subscription {
    return this.invoiceService.getSelectedInvoiceObservable().subscribe( res => {
      console.log(res);
      this.selectedInvoice = res;
      this.selectedInvoice.setType(TYPE.sales);
      this.selectedInvoice.updateTotal();
    });
  }


}
