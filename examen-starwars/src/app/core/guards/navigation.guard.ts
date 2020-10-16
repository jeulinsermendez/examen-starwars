import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { observable, Observable, of } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class NavigationGuard implements CanActivate{

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>   {

    return new Observable(x => {
      this.authenticationService.userHasPermission(route.data.roles).subscribe( result => {
        if (!result) {
          this.router.navigate(['/error'], {skipLocationChange: true});
          x.next(false);
          x.complete();
        }
        x.next(result);
        x.complete();
      });
    });
  }
}
