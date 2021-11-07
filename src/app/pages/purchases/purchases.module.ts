import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PurchasesPageRoutingModule } from './purchases-routing.module';

import { PurchasesPage } from './purchases.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    ComponentsModule,
    PurchasesPageRoutingModule,
    PipesModule
  ],
  declarations: [PurchasesPage]
})
export class PurchasesPageModule {}
