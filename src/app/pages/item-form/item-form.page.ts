/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-len */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Item } from 'src/app/models';
import { ItemService, LoadingService } from 'src/app/services';

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
    private itemService: ItemService,
    private loadingService: LoadingService
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
        exp_date: new FormControl('', Validators.compose([
          Validators.required
        ])),
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
    if (this.itemForm.invalid) {
      return Object.values(this.itemForm.controls).forEach(
        formControl => {
          formControl.markAsTouched();
        });
    } else {
      await this.loadingService.presentLoading('Cargando, espere por favor...');
      this.itemForm.value.exp_date = new Date(this.itemForm.value.exp_date);
      const newItem = new Item(this.itemForm.value, true);
      if (this.isEdition) {
        await this.itemService.updateItem(newItem, this.selectedItem.id);
      } else {
        await this.itemService.storeItem(newItem);
      }
      await this.router.navigate(['/items']);
      await this.loadingService.dismissLoading();
    }
  }

  itemsSub() {
    return this.itemService.getItemObservable().subscribe( item => {
      this.selectedItem = item;
    });
  }

  private setTitle() {
    const navParams = this.router.getCurrentNavigation().extras.state;
    if (navParams) {
      this.pageName = navParams;
      this.isEdition = true;
      this.buttonLabel = 'Guardar Cambios';
    } else {
      this.pageName = 'Agregar Nuevo Producto';
      this.isEdition = false;
      this.buttonLabel = 'Agregar';
    }
  }
}
