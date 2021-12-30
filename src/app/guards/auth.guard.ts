import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    console.log('AuthGuard canActivate method');
    return this.authService.isAuthenticated.pipe(
      filter((val) => val !== null),
      take(1),
      map((isAuthenticated) => {
        console.log('auth state: ', isAuthenticated);
        if (isAuthenticated) {
          return true;
        } else {
          this.router.navigateByUrl('/signin');
          return false;
        }
      })
    );
  }
}
