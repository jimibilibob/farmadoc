/* eslint-disable curly */
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService, ToastService } from '.';
import { Invoice, InvoiceItems, TYPE } from '../models';
import { StaticSupabase } from './common/static_supabase';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private invoices: BehaviorSubject<Invoice[]>;
  private selectedInvoice: BehaviorSubject<Invoice>;
  private itemToAdd: BehaviorSubject<InvoiceItems>;

  constructor(
    private toastService: ToastService,
    private authService: AuthService
  ) {
    this.invoices = new BehaviorSubject<Invoice[]>([]);
    this.selectedInvoice = new BehaviorSubject<Invoice>(new Invoice());
  }

  searchInvoices(invoices: Invoice[], word: string) {
    word = word.toLocaleLowerCase();
    return invoices.filter( inv =>
      inv.name.toLocaleLowerCase().includes(word) ||
      inv.invoice_number.toLocaleLowerCase().includes(word) ||
      this.searchInvoiceItems(inv.items, word).length > 0
      );
  }

  getSelectedInvoiceObservable(): Observable<Invoice> {
    return this.selectedInvoice.asObservable();
  }

  setSelectedInvoice(invoice: Invoice) {
    this.selectedInvoice.next(invoice);
  }

  getItemToAdd(): Observable<InvoiceItems> {
    return this.itemToAdd.asObservable();
  }

  setItemToAdd(itemToAdd: InvoiceItems) {
    this.itemToAdd.next(itemToAdd);
  }

  getInvoicesObservable(): Observable<Invoice[]> {
    return this.invoices.asObservable().pipe(
      catchError(error => {
        console.log('Error while get items:', error);
        return of([]);
      })
    );
  }

  async getInvoices() {
    const rawInvoices = await StaticSupabase.supabaseClient
    .from('invoices')
    .select(`id,
      name,
      total,
      invoice_number,
      type_id,
      items:invoice_item(
        id,
        invoice_id,
        item_id,
        price,
        discount,
        units,
        total_sub,
        details:items(
          id,
          laboratory,
          commercial_name,
          generic_name,
          description
        )
      ),
      created_at`)
    .eq('user_id', this.authService.user.id)
    .order('created_at', { ascending: false })
    .order('type_id');

    const invoices = rawInvoices.data.map( invoice => {
      console.log(invoice);
      return new Invoice(invoice, true);
    });
    this.invoices.next(invoices);
  }

  async storeInvoice(invoice: Invoice) {
    const invoiceItems = invoice.items;
    invoice.addUserId(this.authService.user.id);
    invoice.purgeAttr();
    console.log('storeInvoice Service:', invoice);
    const{ error, data } = await StaticSupabase.supabaseClient
    .from('invoices')
    .upsert([
      invoice
    ]);
    if (error) {
      let color = 'primary';
      switch (invoice.type_id) {
        case TYPE.purchases:
          color = 'warning';
          break;
        case TYPE.sales:
          color = 'tertiary';
          break;
        default:
          break;
      }
      await this.toastService.presentToast({
      message: 'Error inesperado, por favor vuelva a intentar más tarde',
      color
      });
    } else {
      console.log('UPSERT INVOICE:', data);
      await this.storeInvoiceItems(invoiceItems, data[0].id, invoice.type_id);
    }
    await this.getInvoicesByType(invoice.type_id);
  }

  async getInvoicesByType(type: TYPE) {
    const rawInvoices = await StaticSupabase.supabaseClient
    .from('invoices')
    .select(`id,
      name,
      total,
      invoice_number,
      type_id,
      items:invoice_item(
        id,
        invoice_id,
        item_id,
        price,
        sale_price,
        discount,
        units,
        total_sub,
        details:items(
          id,
          laboratory,
          commercial_name,
          generic_name,
          description
        )
      ),
      created_at`)
    .eq('user_id', this.authService.user.id)
    .eq('type_id', type)
    .order('created_at', { ascending: false })
    .order('type_id');

    const invoices = rawInvoices.data.map( invoice => {
      console.log(invoice);
      return new Invoice(invoice, true);
    });
    this.invoices.next(invoices);
  }

  private async storeInvoiceItems(invoiceItems: InvoiceItems[], invoiceId: number, type: TYPE) {
    if (invoiceItems.length <= 0) {
      return;
    }

    invoiceItems.forEach( iitem => {
      iitem.prepareToStore(invoiceId, iitem.item_id);
    });

    console.log('ITEMS:', invoiceItems);

    const{ error, data } = await StaticSupabase.supabaseClient
    .from('invoice_item')
    .insert(
      invoiceItems
    );
    let message = 'Error';
    let color = 'primary';
    switch (type) {
      case TYPE.purchases:
        message = 'Compra guardada exitosamente!';
        color = 'warning';
        break;
      case TYPE.sales:
        message = 'Venta guardada exitosamente!';
        color = 'tertiary';
        break;
      default:
        break;
    }
    if (error) message = 'Error inesperado, por favor vuelva a intentar más tarde';
    await this.toastService.presentToast({
      message,
      color
    });
    await this.getInvoicesByType(type);
  }

  // TODO: Check this method
  private async updateInvoice(invoice: Invoice, invoiceId: number) {
    invoice.addUserId(this.authService.user.id);
    const{ error, data } = await StaticSupabase.supabaseClient
    .from('invoices')
    .update(
      invoice
    ).eq('id', invoiceId);
    if (error) {
      await this.toastService.presentToast({
      message: 'Error inesperado, por favor vuelva a intentar más tarde'
      });
    } else {
      await this.toastService.presentToast({
        message: 'Factura actualizada exitosamente!'
        });
    }
    await this.getInvoices();
  }

  private searchInvoiceItems(invoiceItems: InvoiceItems[], word: string) {
    return invoiceItems.filter( iitem =>
      iitem.details.commercial_name.toLocaleLowerCase().includes(word) ||
      iitem.details.generic_name.toLocaleLowerCase().includes(word) ||
      iitem.details.description.toLocaleLowerCase().includes(word) );
  }
}
