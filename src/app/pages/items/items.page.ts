/* eslint-disable curly */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Item } from 'src/app/models/item';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
})
export class ItemsPage implements OnInit, OnDestroy {

  showSearchBar: boolean;
  items: Item[];
  subs: Subscription;

  constructor(
    private supabaseService: SupabaseService
  ) {
    this.subs = new Subscription();
    this.showSearchBar = false;
   }

  async ngOnInit() {
    await this.getItems();
    this.subs.add(this.subItems());
  }

  async ngOnDestroy() {
    this.subs.unsubscribe();
  }

  search() {
    this.showSearchBar = true;
  }

  subItems() {
    return this.supabaseService.getItemsObservable().subscribe( rawItems => {
      if (rawItems !== undefined) {
        console.log('Items-->', rawItems);
        this.items = rawItems;
      }
    });
  }

  async getItems(event?: any) {
    await this.supabaseService.getItems();
    if (event) event.target.complete();
  }
}
