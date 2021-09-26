/* eslint-disable curly */
/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Item } from '../models';
import { ToastService } from './common/toast.service';

const EMPTY_USER = {
  email: 'farmadoc@gmail.com',
  password: ''
};

interface FarmaDocUser {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  private supabase: SupabaseClient;
  private items: BehaviorSubject<Item[]>;
  private selectedItem: BehaviorSubject<Item>;
  private currentUser: BehaviorSubject<FarmaDocUser>;

  constructor(
    private toastService: ToastService
  ) {
    this.currentUser = new BehaviorSubject<FarmaDocUser>(EMPTY_USER);
    this.items = new BehaviorSubject<Item[]>([]);
    this.selectedItem = new BehaviorSubject<Item>(new Item());
    this.supabase = createClient(environment.supabaseUrl, environment.supbaseKey);
  }

  /**
   *
   * Auth methods
   *
   * @param email
   * @param password
   * @returns
   */
  async signUp(user: FarmaDocUser) {
    return await this.supabase.auth.signUp(user);
  }

  async signIn(user: FarmaDocUser) {
    console.log('signIn USER', user.email);
    this.currentUser.next({
      email: user.email,
      password: ''
    });
    return await this.supabase.auth.signIn(user);
  }

  async signOut() {
    await this.supabase.auth.signOut();
  }

  getUserObservable(): Observable<FarmaDocUser> {
    return this.currentUser.asObservable();
  }

  get user() {
    return this.supabase.auth.user();
  }

  get session() {
    return this.supabase.auth.session();
  }

  get isUserLoggedIn() {
    return this.session ? true : false;
  }

  /**
   *
   * Items methods
   *
   * @returns
   */
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
    const rawItems = await this.supabase
    .from('items')
    .select(`id, generic_name, commercial_name, description, price, exp_date, provider`)
    .eq('user_id', this.user.id)
    .order('id');

    const items = rawItems.data.map( item => new Item(item, true));
    this.items.next(items);
  }

  async storeItem(item: Item) {
    item.addUserId(this.user.id);
    const{ error, data } = await this.supabase
    .from('items')
    .insert([
      item
    ]);
    if (error) {
      await this.toastService.presentToast({
      message: 'Error inesperado, por favor vuelva a intentar más tarde'
      });
    } else {
      await this.toastService.presentToast({
        message: 'Producto guardado exitosamente!'
        });
    }
    await this.getItems();
  }

  async updateItem(item: Item, itemId: number) {
    item.addUserId(this.user.id);
    const{ error, data } = await this.supabase
    .from('items')
    .update(
      item
    ).eq('id', itemId);
    if (error) {
      await this.toastService.presentToast({
      message: 'Error inesperado, por favor vuelva a intentar más tarde'
      });
    } else {
      await this.toastService.presentToast({
        message: 'Producto actualizado exitosamente!'
        });
    }
    await this.getItems();
  }
}
