import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SupabaseService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy{

  currentUser: any;
  subs: Subscription;

  constructor(
    private router: Router,
    private supabaseService: SupabaseService
  ) {
    this.subs = new Subscription();
  }

  ngOnInit() {
    this.subs.add(this.userSub());
    if (this.supabaseService.session) {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/signin']);
    }
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  private userSub() {
    this.supabaseService.getUserObservable().subscribe( user => {
      this.currentUser = user;
    });
  }
}
