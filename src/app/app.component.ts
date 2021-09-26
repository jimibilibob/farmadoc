import { Component, OnDestroy, OnInit } from '@angular/core';
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
    private supabaseService: SupabaseService
  ) {
    this.subs = new Subscription();
  }

  ngOnInit() {
    this.subs.add(this.userSub());
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
