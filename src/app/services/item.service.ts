import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastService } from '.';
import { Item } from '../models';
import { AuthService } from './auth.service';
import { StaticSupabase } from './common/static_supabase';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private items: BehaviorSubject<Item[]>;
  private selectedItem: BehaviorSubject<Item>;

  constructor(
    private toastService: ToastService,
    private authService: AuthService
  ) {
    this.items = new BehaviorSubject<Item[]>([]);
    this.selectedItem = new BehaviorSubject<Item>(new Item());
   }

  searchItems(items: Item[], word: string) {
    word = word.toLocaleLowerCase();
    return items.filter( i =>
      i.commercial_name.toLocaleLowerCase().includes(word) ||
      i.generic_name.toLocaleLowerCase().includes(word) ||
      i.laboratory.toLocaleLowerCase().includes(word));
  }

  getItemsObservable(): Observable<any> {
    return this.items.asObservable().pipe(
      catchError(error => {
        console.log('Error while get items:', error);
        return of([]);
      })
    );
  }

  getItemObservable(): Observable<any> {
    return this.selectedItem.asObservable();
  }

  setSelectedItem(item: Item) {
    this.selectedItem.next(item);
  }

  async getItems() {
    const rawItems = await StaticSupabase.supabaseClient
    .from('items')
    .select(`
    id,
    generic_name,
    commercial_name,
    description,
    price,
    sale_price,
    exp_date,
    laboratory`)
    .eq('user_id', this.authService.user.id)
    .order('id');

    const items = rawItems.data.map( item => new Item(item, true));
    this.items.next(items);
  }

  async storeItem(item: Item) {
    item.addUserId(this.authService.user.id);
    const{ error, data } = await StaticSupabase.supabaseClient
    .from('items')
    .insert([
      item
    ]);
    if (error) {
      await this.toastService.presentToast({
      message: 'Error inesperado, por favor vuelva a intentar m??s tarde'
      });
      return;
    }
    await this.toastService.presentToast({
      message: 'Producto guardado exitosamente!'
      });
    await this.getItems();
  }

  // parametros nombrados
  async updateItem({item, itemId}: UpdateItemsParams) {
    item.addUserId(this.authService.user.id);
    const{ error, data } = await StaticSupabase.supabaseClient
    .from('items')
    .update(
      item
    ).eq('id', itemId);
    if (error) {
      await this.toastService.presentToast({
      message: 'Error inesperado, por favor vuelva a intentar m??s tarde'
      });
    }
    await this.toastService.presentToast({
      message: 'Producto actualizado exitosamente!'
      });
    await this.getItems();
  }
}

interface UpdateItemsParams {
  item: Item;
  itemId: number;
}
