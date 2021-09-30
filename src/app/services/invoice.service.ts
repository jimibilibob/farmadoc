import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService, ToastService } from '.';
import { Invoice } from '../models';
import { StaticSupabase } from './common/static_supabase';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private invoices: BehaviorSubject<Invoice[]>;
  private selectedInvoice: BehaviorSubject<Invoice>;

  constructor(
    private toastService: ToastService,
    private authService: AuthService
  ) {
    this.invoices = new BehaviorSubject<Invoice[]>([]);
    this.selectedInvoice = new BehaviorSubject<Invoice>(new Invoice());
  }

  getSelectedInvoiceObservable(): Observable<Invoice> {
    return this.selectedInvoice.asObservable();
  }

  setSelectedInvoice(invoice: Invoice) {
    this.selectedInvoice.next(invoice);
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
    items:invoice_item(
      id, invoice_id, item_id, price, discount, units, total_sub
    ),
    created_at`)
  .eq('user_id', this.authService.user.id)
  .order('id');

  const invoices = rawInvoices.data.map( invoice => {
    console.log(invoice);
    return new Invoice(invoice, true);
  });
  this.invoices.next(invoices);
  }

  // TODO: Check this method
  async storeInvoice(invoice: Invoice) {
    invoice.addUserId(this.authService.user.id);
    const{ error, data } = await StaticSupabase.supabaseClient
    .from('invoice')
    .insert([
      invoice
    ]);
    if (error) {
      await this.toastService.presentToast({
      message: 'Error inesperado, por favor vuelva a intentar más tarde'
      });
    } else {
      await this.toastService.presentToast({
        message: 'Factura guardada exitosamente!'
        });
    }
    await this.getInvoices();
  }

  // TODO: Check this method
  async updateInvoice(invoice: Invoice, invoiceId: number) {
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
}
