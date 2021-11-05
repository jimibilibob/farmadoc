import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SaleFormPage } from './sale-form.page';

const routes: Routes = [
  {
    path: '',
    component: SaleFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SaleFormPageRoutingModule {}
