import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.page.html',
  styleUrls: ['./item-form.page.scss'],
})
export class ItemFormPage implements OnInit {

  itemCreationForm: FormGroup;

  constructor() {
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

  ngOnInit() {
  }

  async createItem() {
    console.log('Form value', this.itemCreationForm.value);
  }

}
