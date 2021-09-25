/* eslint-disable curly */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { of, Subscription } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Item } from 'src/app/models';
import { NavService, SupabaseService } from 'src/app/services';

@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
})
export class ItemsPage implements OnInit, OnDestroy {

  showSearchBar: boolean;
  items: Item[];
  filteredItems: Item[];
  subs: Subscription;

  constructor(
    private supabaseService: SupabaseService,
    private navService: NavService
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

  search(event: CustomEvent) {
    const $inputSub = of(event.detail.value)
      .pipe(catchError(error =>
        of('')
        ),
        map( word => this.filteredItems = this.items.filter( i =>
          i.commercial_name.includes(word) || i.generic_name.includes(word) || i.provider.includes(word))),
        debounceTime(1000),
        distinctUntilChanged())
        .subscribe(console.log);
    this.subs.add($inputSub);
  }

  subItems() {
    return this.supabaseService.getItemsObservable().subscribe( rawItems => {
      if (rawItems !== undefined) {
        console.log('Items-->', rawItems);
        this.items = rawItems;
        this.filteredItems = this.items;
      }
    });
  }

  async getItems(event?: any) {
    await this.supabaseService.getItems();
    if (event) event.target.complete();
  }

  goToItemForm(item: Item) {
    this.supabaseService.setSelectedItem(item);
    this.navService.pushToNextScreenWithParams('/item-form', 'Editar Producto');
  }
}
