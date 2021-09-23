/* eslint-disable max-len */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Item } from 'src/app/models';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.page.html',
  styleUrls: ['./item-form.page.scss'],
})
export class ItemFormPage implements OnInit, OnDestroy {

  itemCreationForm: FormGroup;
  subs: Subscription;

  constructor(
    private router: Router,
    private supabaseService: SupabaseService
  ) {
    this.subs = new Subscription();
    this.itemCreationForm = new FormGroup(
      {
        name: new FormControl('', Validators.compose([
          Validators.required,
        ])),
        price: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern('^([0-9]{0,4}((.)[0-9]{0,2}))$')
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
  }

  async createItem() {
    console.log('Form value', this.itemCreationForm.value);
    const newItem = new Item(this.itemCreationForm.value, true);
    await this.supabaseService.storeItem(newItem);
    this.router.navigate(['/items']);
  }

  itemsSub() {
    return this.supabaseService.getItemsObservable().subscribe( res => {
      console.log('Items from Subscription:', res);
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
}
