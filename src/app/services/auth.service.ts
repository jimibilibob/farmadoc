import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StaticSupabase } from './common/static_supabase';

const EMPTY_USER = {
  email: 'farmadoc@gmail.com',
  password: ''
};

interface FarmaDocUser {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser: BehaviorSubject<FarmaDocUser>;

  constructor() {
    this.currentUser = new BehaviorSubject<FarmaDocUser>(EMPTY_USER);
  }

  async signUp(user: FarmaDocUser) {
    return await StaticSupabase.supabaseClient.auth.signUp(user);
  }

  async signIn(user: FarmaDocUser) {
    console.log('signIn USER', user.email);
    this.currentUser.next({
      email: user.email,
      password: ''
    });
    return await StaticSupabase.supabaseClient.auth.signIn(user);
  }

  async signOut() {
    await StaticSupabase.supabaseClient.auth.signOut();
  }

  getUserObservable(): Observable<FarmaDocUser> {
    return this.currentUser.asObservable();
  }

  get user() {
    return StaticSupabase.supabaseClient.auth.user();
  }

  get session() {
    return StaticSupabase.supabaseClient.auth.session();
  }

  get isUserLoggedIn() {
    return this.session ? true : false;
  }
}
