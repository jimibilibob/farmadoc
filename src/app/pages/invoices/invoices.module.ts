import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { InvoicesPageRoutingModule } from './invoices-routing.module';

import { InvoicesPage } from './invoices.page';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InvoicesPageRoutingModule,
    FontAwesomeModule,
    PipesModule
  ],
  declarations: [InvoicesPage]
})
export class InvoicesPageModule {}
