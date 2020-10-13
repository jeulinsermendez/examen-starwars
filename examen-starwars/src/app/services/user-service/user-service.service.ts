import { Observable, of } from 'rxjs';
import { User } from '../../models/user.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userLogin: User = null;
  constructor( private http: HttpClient ) { }

  getUsers(): Observable<User[]> {

    const users = localStorage.getItem('users');
    return of(JSON.parse(users) as User[]);
  }

  editUser(user: User): void{
    let users = JSON.parse(localStorage.getItem('users')) as User[];
    let foundUser = users.find(x => x.username === user.username);
    let foundUserIndex = foundUser;
    foundUser.email = user.email;
    foundUser.password = user.password;
    users[users.indexOf(foundUserIndex)] = foundUser;
  }

  deleteUser(username: string): Observable<boolean>{
    let users = JSON.parse(localStorage.getItem('users')) as User[];
    users = users.filter(z => z.username !== username);
    localStorage.setItem('users', JSON.stringify(users));

    return of(true);
  }

  createUser(user: User ): Observable<boolean>{

    if (user === undefined || user === null){
      return of(false);
    }

    const users = localStorage.getItem('users');
    if (users === null){
      const usersRegistered = [];
      usersRegistered.push(user);
      localStorage.setItem('users', JSON.stringify(usersRegistered));
    } else {
      const usersParsed = JSON.parse(users) as User[];
      usersParsed.push(user);
      localStorage.setItem('users', JSON.stringify(usersParsed));
    }
    return of(true);
  }

  existsUser(username: string): Observable<boolean> {
    const users = localStorage.getItem('users');
    const usersParsed = JSON.parse(users) as User[];
    return of(usersParsed.find(x => x.username === username) !== null);
  }

}