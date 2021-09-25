/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-len */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Item } from 'src/app/models';
import { SupabaseService } from 'src/app/services';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.page.html',
  styleUrls: ['./item-form.page.scss'],
})
export class ItemFormPage implements OnInit, OnDestroy {

  pageName: any;
  buttonLabel: any;
  isEdition: boolean;
  itemForm: FormGroup;
  selectedItem: Item;
  subs: Subscription;

  constructor(
    private router: Router,
    private supabaseService: SupabaseService
  ) {
    this.setTitle();
    this.subs = new Subscription();
    this.itemForm = new FormGroup(
      {
        generic_name: new FormControl('', Validators.compose([
          Validators.required,
        ])),
        commercial_name: new FormControl('', Validators.compose([
          Validators.required,
        ])),
        provider: new FormControl('', Validators.compose([
          Validators.required,
        ])),
        price: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern('^([0-9]{0,4}((.)[0-9]{0,2}))$')
        ])),
        exp_date: new FormControl(''),
        description: new FormControl('')
      }
    );
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit() {
    this.subs.add(this.itemsSub());
    const itemToEdit = {
      generic_name: this.selectedItem.generic_name,
      commercial_name: this.selectedItem.commercial_name,
      description: this.selectedItem.description,
      price: this.selectedItem.price,
      exp_date: this.selectedItem.exp_date,
      provider: this.selectedItem.provider,
    };
    if (this.isEdition) {
      this.itemForm.setValue(itemToEdit);
    }
  }

  async createOrUpdateItem() {
    this.itemForm.value.exp_date = new Date(this.itemForm.value.exp_date);
    console.log('Form value', this.itemForm.value.exp_date);
    const newItem = new Item(this.itemForm.value, true);
    if (this.isEdition) {
      await this.supabaseService.updateItem(newItem, this.selectedItem.id);
    } else {
      await this.supabaseService.storeItem(newItem);
    }
    this.router.navigate(['/items']);
  }

  itemsSub() {
    return this.supabaseService.getItemObservable().subscribe( item => {
      console.log('Item from Subscription:', item);
      this.selectedItem = item;
    });
  }

  async signUp() {
    const signUp = this.supabaseService.signUp('isra.neri2@gmail.com', 'alissa');
    console.log('SignUp response:', signUp);
  }

  async signIn() {
    const signIn = this.supabaseService.signIn('isra.neri2@gmail.com', 'alissa');
    console.log('SignIn response:', signIn);
  }

  private setTitle() {
    if (this.router.getCurrentNavigation().extras.state) {
      this.pageName = this.router.getCurrentNavigation().extras.state;
      this.isEdition = true;
      this.buttonLabel = 'Editar';
      console.log(this.pageName);
    } else {
      this.pageName = 'Agregar Nuevo Producto';
      this.isEdition = false;
      this.buttonLabel = 'Agregar';
    }
  }
}
