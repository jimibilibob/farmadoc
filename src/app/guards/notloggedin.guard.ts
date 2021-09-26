import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SupabaseService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class NotloggedinGuard implements CanActivate {

  constructor(
    private supabaseService: SupabaseService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (!this.supabaseService.isUserLoggedIn) {
        return true;
      }
      return false;
  }
}
