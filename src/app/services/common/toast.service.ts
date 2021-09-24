/* eslint-disable @typescript-eslint/member-delimiter-style */
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toast: HTMLIonToastElement;

  constructor(private toastController: ToastController) {
  }

  async presentToast({
    message,
    position = 'bottom',
    color = 'primary',
    duration = 2500
  }: {
    message: string,
    position?: 'top' | 'bottom' | 'middle',
    color?: string,
    duration?: number
  }) {

    this.toast = await this.toastController.create({
      message,
      position,
      color,
      duration
    });
    return this.toast.present();
  }
}
