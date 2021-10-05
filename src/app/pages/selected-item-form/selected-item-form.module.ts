import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectedItemFormPageRoutingModule } from './selected-item-form-routing.module';

import { SelectedItemFormPage } from './selected-item-form.page';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectedItemFormPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  declarations: [SelectedItemFormPage]
})
export class SelectedItemFormPageModule {}
