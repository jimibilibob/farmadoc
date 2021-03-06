import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  invoiceFormValidations, itemFormValidations, selectedItemFormValidations, signinFormValidations, signupFormValidations
 } from 'src/app/constants';
import { saleFormValidations } from 'src/app/constants/validation-errors/sale-form';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent implements OnInit {

  @Input() formName: string;
  @Input() control: any;
  @Input() marginInputWithIcon: boolean;

  formControlName: string;
  formControl: FormControl;
  validations: any;

  constructor() {
    this.formControlName = '';
    this.formControl = new FormControl();
    this.validations = {
      invoiceForm: invoiceFormValidations,
      saleForm: saleFormValidations,
      itemForm: itemFormValidations,
      selectedItemForm: selectedItemFormValidations,
      signinForm: signinFormValidations,
      signupForm: signupFormValidations,
    };
  }

  ngOnInit() {
    this.formControlName = Object.keys(this.control)[0];
    this.formControl = this.control[this.formControlName];
  }

}
