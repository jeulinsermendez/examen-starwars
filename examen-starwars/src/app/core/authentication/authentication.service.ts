import { Injectable } from '@angular/core';
import { UserService } from '../../services/user-service/user-service.service';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUser: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  currentUser$ = this.currentUser.asObservable();

  constructor(
    private userService: UserService,
    private router: Router
    ) { }

  login(userName: string, password: string): Observable<boolean> {
    return new Observable<boolean>(observable => {
      this.userService.getUsers().subscribe(users => {
        const foundUser = users.find(x => x.userName === userName && x.password === password);
        if ( foundUser !== undefined) {
          this.currentUser.next(foundUser);
          observable.next(true);
        } else {
          observable.next(false);
        }
        observable.complete();
      });
    });
  }

  isAuthenticated(): Observable<boolean> {
    if (this.currentUser.getValue() === null) {
      this.router.navigate(['/login']);
    }
    return of(true);
  }

  userHasPermission(rolesToCkeck: string[]): Observable<boolean>{

      return of(rolesToCkeck.includes(this.currentUser.getValue().role));
  }
}
