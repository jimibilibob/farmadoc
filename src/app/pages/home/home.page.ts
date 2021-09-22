import { Component, OnInit } from '@angular/core';
import {fas, faFileInvoice, faList} from '@fortawesome/free-solid-svg-icons';
import {far, faListAlt} from '@fortawesome/free-regular-svg-icons';
import {fab} from '@fortawesome/free-brands-svg-icons';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  invoiceIcon = faFileInvoice;
  productIcon = faList;
  constructor() { }

  ngOnInit() {
  }

}
