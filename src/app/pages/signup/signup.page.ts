import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SupabaseService, ToastService } from 'src/app/services';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  signgupForm: FormGroup;

  constructor(
    private toastService: ToastService,
    private router: Router,
    private supabaseService: SupabaseService
  ) {
    this.signgupForm = new FormGroup({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required
      ]))
    });
  }

  ngOnInit() {
  }

  async signUp() {
    const {error, data} = await this.supabaseService.signUp(this.signgupForm.value);
    console.log('ERROR WHILE SIGNUP:', error);
    console.log('DATA WHILE SIGNUP:', data);
    if (error) {
      await this.toastService.presentToast({
        message: 'Error inesperado, por favor vuelva a intentar más tarde'
        });
    } else {
      await this.toastService.presentToast({
        message: `Se le ha enviado un correo de activación de cuenta a ${this.signgupForm.value.email}`,
        duration: 5000
        });
      this.signgupForm.reset();
      this.router.navigate(['/signin']);
    }
  }
}
