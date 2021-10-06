import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loading: HTMLIonLoadingElement;

  constructor(private loadingController: LoadingController) { }

  async presentLoading(message: string) {
    this.loading = await this.loadingController.create({
      cssClass: 'loading-class',
      message,
      spinner: 'circular'
    });
    return await this.loading.present();
  }

  dismissLoading() {
    if (this.loading) {
      this.loading.dismiss();
    }
  }

}
