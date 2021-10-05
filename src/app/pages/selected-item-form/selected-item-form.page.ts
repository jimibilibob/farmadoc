import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { Item } from 'src/app/models';
import { ItemService } from 'src/app/services';

@Component({
  selector: 'app-selected-item-form',
  templateUrl: './selected-item-form.page.html',
  styleUrls: ['./selected-item-form.page.scss'],
})
export class SelectedItemFormPage implements OnInit, OnDestroy {

  selectedItem: Item;
  selectedItemForm: FormGroup;
  calendarIcon = faCalendarDay;
  subs: Subscription;

  constructor(
    private itemService: ItemService
  ) {
    this.subs = new Subscription();
    this.selectedItemForm = new FormGroup({
      units: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^([0-9]{1,5})$')
      ])),
      price: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^([0-9]{0,4}((.)[0-9]{0,2}))$')
      ]))
    });
  }

  ngOnInit() {
    this.subs.add(this.addItemSub());
    this.selectedItemForm.setValue({
      price: this.selectedItem.price,
      units: null
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  private addItemSub(): Subscription {
    return this.itemService.getItemObservable().subscribe( item => {
      this.selectedItem = item;
    });
  }
}
