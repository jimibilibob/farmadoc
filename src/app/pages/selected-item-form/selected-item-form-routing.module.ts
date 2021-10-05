import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectedItemFormPage } from './selected-item-form.page';

const routes: Routes = [
  {
    path: '',
    component: SelectedItemFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectedItemFormPageRoutingModule {}
