import { Component, OnInit } from '@angular/core';
import { faAt, faEye, faEyeSlash, faLock } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


import { AuthService, ToastService } from 'src/app/services';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  signupForm: FormGroup;
  showPassword = false;
  eyeIcon = faEye;
  eyeSlashIcon = faEyeSlash;
  lockIcon = faLock;
  atIcon = faAt;
  icons = {
    email: false,
    password: false
  };

  constructor(
    private toastService: ToastService,
    private router: Router,
    private authService: AuthService
  ) {
    this.signupForm = new FormGroup({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
      ]))
    });
  }

  ngOnInit() {
  }

  async signUp() {
    if (this.signupForm.invalid) {
      return Object.values(this.signupForm.controls).forEach(
        formControl => {
          formControl.markAsTouched();
        });
    }
    const {error, data} = await this.authService.signUp(this.signupForm.value);
    if (error) {
      await this.toastService.presentToast({
        message: 'Error inesperado, por favor vuelva a intentar más tarde'
        });
      return;
    }
    await this.toastService.presentToast({
      message: `Bienvenido!`,
      duration: 5000
      });
    this.router.navigate(['/home']);
    this.signupForm.reset();
  }

  async goToSignin() {
    this.router.navigate(['/signin']);
    this.signupForm.reset();
    this.icons.email = false;
    this.icons.password = false;
  }

  async passwordToogle() {
    this.showPassword = !this.showPassword;
  }
}
