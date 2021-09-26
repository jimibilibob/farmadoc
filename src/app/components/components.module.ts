import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { ErrorComponent } from './error/error.component';



@NgModule({
  declarations: [
    SideMenuComponent,
    HeaderComponent,
    ErrorComponent
  ],
  exports: [
    SideMenuComponent,
    HeaderComponent,
    ErrorComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
