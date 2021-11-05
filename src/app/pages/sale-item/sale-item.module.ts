import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SaleItemPageRoutingModule } from './sale-item-routing.module';

import { SaleItemPage } from './sale-item.page';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SaleItemPageRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    ComponentsModule
  ],
  declarations: [SaleItemPage]
})
export class SaleItemPageModule {}
