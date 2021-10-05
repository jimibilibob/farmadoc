import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { itemFormValidations, selectedItemFormValidations, signinFormValidations, signupFormValidations } from 'src/app/constants';

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
      itemForm: itemFormValidations,
      selectedItemForm: selectedItemFormValidations,
      signinForm: signinFormValidations,
      signupForm: signupFormValidations
    };
  }

  ngOnInit() {
    this.formControlName = Object.keys(this.control)[0];
    this.formControl = this.control[this.formControlName];
  }

}
