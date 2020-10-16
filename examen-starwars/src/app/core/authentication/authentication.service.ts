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
    ) {
      this.currentUser.next(this.getUserLogged());
     }

  login(userName: string, password: string): Observable<boolean> {
    return new Observable<boolean>(observable => {
      this.userService.getUsers().subscribe(users => {
        const foundUser = users.find(x => x.userName === userName && x.password === password);
        if ( foundUser !== undefined) {
          this.currentUser.next(foundUser);
          this.saveUserSession(foundUser);
          observable.next(true);
        } else {
          observable.next(false);
        }
        observable.complete();
      });
    });
  }

  saveUserSession(user: User): void {
    if (user  === undefined || user === null) {
      return;
    }
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser !== null || currentUser !== undefined) {
      localStorage.removeItem('currentUser');
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
  }

  getUserLogged(): User {
    const userLogged = localStorage.getItem('currentUser');
    if (userLogged === null || userLogged === undefined){
      return null;
    }
    return JSON.parse(userLogged);
  }

  logout(): void{
    localStorage.removeItem('currentUser');
    this.currentUser.next(null);
    this.router.navigate(['/login']);
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
