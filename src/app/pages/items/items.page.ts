/* eslint-disable curly */
import { Capacitor } from '@capacitor/core';
import { catchError, debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { of, Subscription } from 'rxjs';
import { Router } from '@angular/router';


import { Invoice, Item, TYPE } from 'src/app/models';
import { InvoiceService, ItemService, NavService } from 'src/app/services';

@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
})
export class ItemsPage implements OnInit, OnDestroy {

  showSearchBar: boolean;
  items: Item[];
  filteredItems: Item[];
  isSelectingItems: boolean;
  selectedInvoice: Invoice;
  navParams: any;
  pageName: any;
  subs: Subscription;
  capacitor = Capacitor;

  constructor(
    private itemService: ItemService,
    private invoiceService: InvoiceService,
    private navService: NavService,
    private router: Router
  ) {
    this.subs = new Subscription();
    this.isSelectingItems = false;
    this.showSearchBar = false;
    this.setTitle();
   }

  async ngOnInit() {
    await this.getItems();
    this.subs.add(this.subItems());
    this.subs.add(this.subInvoice());
  }

  async ngOnDestroy() {
    this.subs.unsubscribe();
    console.log('Selecting items:', this.isSelectingItems);
  }

  search(event: any) {
    const $inputSub = of(event.detail.value)
      .pipe(catchError(error =>
        of('')
        ),
        map( (word: string) =>
          this.filteredItems = this.itemService.searchItems(this.items, word)
        ),
        debounceTime(1000),
        distinctUntilChanged())
        .subscribe(console.log);
    this.subs.add($inputSub);
  }

  async getItems(event?: any) {
    await this.itemService.getItems();
    if (event) event.target.complete();
  }

  onItemCardClick(item: Item) {
    this.itemService.setSelectedItem(item);
    if (this.navParams) {
      this.isSelectingItems = true;
      this.router.navigate([ (this.selectedInvoice.type_id === TYPE.sales)
        ? '/sale-item'
        : '/selected-item']);
      return;
    }
    this.navService.pushToNextScreenWithParams('/item-form', 'Editar Producto');
    this.isSelectingItems = false;
  }

  onBackButton() {
    console.log('On back button', this.isSelectingItems);
    this.router.navigate( [ this.navParams
      ? ((this.selectedInvoice.type_id === TYPE.purchases)
        ? '/invoice-creation'
        : '/sale-form')
      : '/home' ] );
  }

  private subItems() {
    return this.itemService.getItemsObservable().subscribe( rawItems => {
      if (rawItems !== undefined) {
        console.log('Items-->', rawItems);
        this.items = rawItems;
        this.filteredItems = this.items;
      }
    });
  }

  private subInvoice() {
    return this.invoiceService.getSelectedInvoiceObservable().subscribe( res => {
      this.selectedInvoice = res;
    });
  }

  private setTitle() {
    this.navParams = this.router.getCurrentNavigation().extras.state;
    this.pageName = this.navParams ?? 'Productos';
  }
}
