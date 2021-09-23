import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
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
          Validators.pattern('d')
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
    this.supabaseService.storeItem( this.itemCreationForm.value);
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
