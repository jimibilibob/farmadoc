import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, ToastService } from 'src/app/services';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  signinForm: FormGroup;

  constructor(
    private toastService: ToastService,
    private router: Router,
    private authService: AuthService
  ) {
    this.signinForm = new FormGroup({
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

  async signIn() {
    if (this.signinForm.invalid) {
      return Object.values(this.signinForm.controls).forEach(
        formControl => {
          formControl.markAsTouched();
        });
    } else {
      const {error, data} = await this.authService.signIn(this.signinForm.value);
      let message = 'Su email o su contraseña son incorrectos.';
      if (error) {
        if (error.message.includes('not confirmed')) {
          message = 'Su email no ha sido confirmado todavía.';
        }
        await this.toastService.presentToast({
          message
          });
      } else {
        message = 'Bienvenido(a)!';
        await this.toastService.presentToast({
          message
          });
        this.signinForm.reset();
        this.router.navigate(['/home']);
      }
    }
  }

  async goToSignup() {
    this.router.navigate(['/signup']);
    this.signinForm.reset();
  }
}
