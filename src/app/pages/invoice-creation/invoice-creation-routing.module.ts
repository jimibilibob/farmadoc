import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvoiceCreationPage } from './invoice-creation.page';

const routes: Routes = [
  {
    path: '',
    component: InvoiceCreationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvoiceCreationPageRoutingModule {}
