import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SupabaseService } from 'src/app/services';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit, OnDestroy {

  currentUser: any;
  subs: Subscription;

  constructor(
    private router: Router,
    private supabaseService: SupabaseService
  ) {
    this.subs = new Subscription();
    this.subs.add(this.userSub);
   }

  ngOnInit() {}

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  async logout() {
    await this.supabaseService.signOut();
    this.router.navigate(['/signin']);
  }

  private userSub() {
    return this.supabaseService.getUserObservable().subscribe( user => {
      console.log(user);
      this.currentUser = user;
    });
  }
}
