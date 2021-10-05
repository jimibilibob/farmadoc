import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InvoiceCreationPageRoutingModule } from './invoice-creation-routing.module';

import { InvoiceCreationPage } from './invoice-creation.page';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InvoiceCreationPageRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  declarations: [InvoiceCreationPage]
})
export class InvoiceCreationPageModule {}
