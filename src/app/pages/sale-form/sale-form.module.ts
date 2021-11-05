import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SaleFormPageRoutingModule } from './sale-form-routing.module';

import { SaleFormPage } from './sale-form.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SaleFormPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  declarations: [SaleFormPage]
})
export class SaleFormPageModule {}
