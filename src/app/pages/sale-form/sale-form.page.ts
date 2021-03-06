/* eslint-disable @typescript-eslint/naming-convention */
import { AlertController } from '@ionic/angular';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { faCalendarDay, faPills } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    try {
      if (this.saleForm.invalid) {
        return Object.values(this.saleForm.controls).forEach(
          formControl => {
            formControl.markAsTouched();
          });
      }
      if (this.selectedInvoice.items.length === 0) {
        const alert = await this.alertController.create({
          message: `Por favor agregue al menos un producto para poder registrar esta compra.`,
          buttons: [
            {
              text: 'ACEPTAR',
              role: 'cancel',
              handler: () => null
            }
          ]
        });
        await alert.present();
        return;
      }
      await this.loadingService.presentLoading('Cargando, espere por favor...');
      this.saleForm.value.exp_date = new Date(this.saleForm.value.exp_date);
      this.selectedInvoice.setFormData(this.saleForm.value.name, this.saleForm.value.invoice_number);
      await this.invoiceService.storeInvoice(this.selectedInvoice);
      await this.router.navigate(['/sales']);
      this.loadingService.dismissLoading();
    } catch (error) {
      console.error('Unexpected behavior:', error);
    }
  }

  goToItems() {
    this.selectedInvoice.setFormData(this.saleForm.value.name, this.saleForm.value.invoice_number);
    this.invoiceService.setSelectedInvoice(this.selectedInvoice);
    this.navService.pushToNextScreenWithParams('/items', 'Seleccione un Producto');
  }

  async removeInvoiceItems(invoiceItem: InvoiceItems) {
    const alert = await this.alertController.create({
      // cssClass: 'alert-class',
      // header: 'Invoice',
      message: `Est?? seguro que desea eliminar <strong>${invoiceItem.details.commercial_name.toLocaleUpperCase()}</strong> 
      de la lista de productos?`,
      buttons: [
        {
          text: 'CONFIRMAR',
          handler: () => {
            this.selectedInvoice.removeItem(invoiceItem);
            this.invoiceService.setSelectedInvoice(this.selectedInvoice);
          }
        },
        {
          text: 'CANCELAR',
          role: 'cancel',
          handler: () => null
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
      this.saleForm.setValue({
        name: this.selectedInvoice.name,
        invoice_number: this.selectedInvoice.invoice_number
      });
    });
  }


}
