import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NavService {

  constructor(
    private navController: NavController
  ) { }

  pushToNextScreenWithParams(pageUrl: any, params: any) {
    this.navController.navigateForward(pageUrl, { state: params });
  }
}
