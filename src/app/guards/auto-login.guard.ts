import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AutoLoginGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    console.log('AutoLoginGuard canActivate method');
    return this.authService.isAuthenticated.pipe(
      filter((val) => val !== null),
      take(1),
      map((isAuthenticated) => {
        console.log('auth state: ', isAuthenticated);
        if (isAuthenticated) {
          this.router.navigateByUrl('/home', { replaceUrl: true });
        } else {
          return true;
        }
      })
    );
  }
}
