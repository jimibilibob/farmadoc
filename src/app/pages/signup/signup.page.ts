import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
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
    } else {
      const {error, data} = await this.authService.signUp(this.signupForm.value);
      console.log('ERROR WHILE SIGNUP:', error);
      console.log('DATA WHILE SIGNUP:', data);
      if (error) {
        await this.toastService.presentToast({
          message: 'Error inesperado, por favor vuelva a intentar más tarde'
          });
      } else {
        await this.toastService.presentToast({
          message: `Bienvenido!`,
          duration: 5000
          });
          this.router.navigate(['/home']);
        }
      this.signupForm.reset();
    }
  }

  async goToSignin() {
    this.router.navigate(['/signin']);
    this.signupForm.reset();
  }

  async passwordToogle() {
    this.showPassword = !this.showPassword;
  }
}
