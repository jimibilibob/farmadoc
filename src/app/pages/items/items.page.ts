import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
})
export class ItemsPage implements OnInit {

  showSearchBar: boolean;

  constructor() {
    this.showSearchBar = false;
   }

  ngOnInit() {
  }

  search() {
    this.showSearchBar = true;
  }

}
