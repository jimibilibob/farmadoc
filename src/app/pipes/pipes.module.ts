import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoicetypePipe } from './invoicetype.pipe';



@NgModule({
  declarations: [
    InvoicetypePipe
  ],
  imports: [
    CommonModule
  ],
  providers: [
    InvoicetypePipe
  ],
  exports: [
    InvoicetypePipe
  ]
})
export class PipesModule { }
