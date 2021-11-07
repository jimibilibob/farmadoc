import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SalesPageRoutingModule } from './sales-routing.module';

import { SalesPage } from './sales.page';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SalesPageRoutingModule,
    FontAwesomeModule,
    PipesModule
  ],
  declarations: [SalesPage]
})
export class SalesPageModule {}
