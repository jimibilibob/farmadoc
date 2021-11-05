import { Component, OnInit } from '@angular/core';
import {faFileInvoice, faList, faShoppingBasket} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  invoiceIcon = faFileInvoice;
  productIcon = faList;
  purchaseIcon = faShoppingBasket;

  constructor() { }

  ngOnInit() {}

}
