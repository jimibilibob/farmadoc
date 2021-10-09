import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit, OnDestroy {

  @Input() currentUser: any;
  email: string;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    this.email = await this.authService.getEmail();
  }

  ngOnDestroy() {}

  async logout() {
    await this.authService.signOut();
    this.router.navigate(['/signin']);
  }
}
