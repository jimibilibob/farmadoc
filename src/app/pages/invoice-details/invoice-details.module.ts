import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InvoicePageRoutingModule } from './invoice-details-routing.module';

import { InvoiceDetailsPage } from './invoice-details.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InvoicePageRoutingModule,
    ReactiveFormsModule,
    ComponentsModule,
    FontAwesomeModule,
    PipesModule
  ],
  declarations: [InvoiceDetailsPage]
})
export class InvoiceDetailsPageModule {}
