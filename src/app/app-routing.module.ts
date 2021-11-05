import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoggedinGuard, NotloggedinGuard } from './guards';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'items',
    loadChildren: () => import('./pages/items/items.module').then( m => m.ItemsPageModule)
  },
  {
    path: 'item-form',
    loadChildren: () => import('./pages/item-form/item-form.module').then( m => m.ItemFormPageModule)
  },
  {
    path: 'signin',
    loadChildren: () => import('./pages/signin/signin.module').then( m => m.SigninPageModule),
    canActivate: [NotloggedinGuard]
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule),
    canActivate: [NotloggedinGuard]
  },
  {
    path: 'invoices',
    loadChildren: () => import('./pages/invoices/invoices.module').then( m => m.InvoicesPageModule)
  },
  {
    path: 'invoice-details',
    loadChildren: () => import('./pages/invoice-details/invoice-details.module').then( m => m.InvoiceDetailsPageModule)
  },
  {
    path: 'invoice-creation',
    loadChildren: () => import('./pages/invoice-creation/invoice-creation.module').then( m => m.InvoiceCreationPageModule)
  },
  {
    path: 'selected-item',
    loadChildren: () => import('./pages/selected-item-form/selected-item-form.module').then( m => m.SelectedItemFormPageModule)
  },
  {
    path: 'sales',
    loadChildren: () => import('./pages/sales/sales.module').then( m => m.SalesPageModule)
  },
  {
    path: 'sale-form',
    loadChildren: () => import('./pages/sale-form/sale-form.module').then( m => m.SaleFormPageModule)
  },
  {
    path: 'sale-item',
    loadChildren: () => import('./pages/sale-item/sale-item.module').then( m => m.SaleItemPageModule)
  },
  {
    path: 'purchases',
    loadChildren: () => import('./pages/purchases/purchases.module').then( m => m.PurchasesPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
