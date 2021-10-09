import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StaticSupabase } from './common/static_supabase';
import { Storage } from '@ionic/storage';

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
  private storage = new Storage();

  constructor() {
    this.currentUser = new BehaviorSubject<FarmaDocUser>(EMPTY_USER);
    this.storage.create();
  }

  async signUp(user: FarmaDocUser) {
    return await StaticSupabase.supabaseClient.auth.signUp(user);
  }

  async signIn(user: FarmaDocUser) {
    await this.storage.set('email', user.email);
    console.log('signIn USER', user.email);
    this.currentUser.next({
      email: user.email,
      password: ''
    });
    return await StaticSupabase.supabaseClient.auth.signIn(user);
  }

  async getEmail() {
    return await this.storage.get('email');
  }

  async signOut() {
    await this.storage.clear();
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
