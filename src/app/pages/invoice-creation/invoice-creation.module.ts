import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InvoiceCreationPageRoutingModule } from './invoice-creation-routing.module';

import { InvoiceCreationPage } from './invoice-creation.page';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InvoiceCreationPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  declarations: [InvoiceCreationPage]
})
export class InvoiceCreationPageModule {}
