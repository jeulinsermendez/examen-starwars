import { TestBed } from '@angular/core/testing';

import { UserService } from './user-service.service';
import { User } from '../../models/user.model';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getUsers', () => {
    const user: User = {
      userName: 'leynormendez',
      name: 'leynor',
      email: 'leinormendez@gmail.com',
      password: '123',
      role: 'Admin'
    };

    service.createUser(user).subscribe(result => {
      expect(result).toBeTrue();
      service.getUsers().subscribe(users => {
        expect(users.length).toBe(1);
        expect(users[0]).toEqual(user);
      });
    });

  });

  it('should editUser', () => {
    const userToCreate: User = {
      userName: 'leynormendez',
      name: 'leynor',
      email: 'leinormendez@gmail.com',
      password: '123',
      role: 'Admin'
    };
    const userToEdit = userToCreate;
    userToEdit.name = 'leynor2';
    service.createUser(userToCreate).subscribe(result => {
      expect(result).toBeTrue();
      service.editUser(userToEdit);
      service.getUsers().subscribe(users => {
        const foundUser = users.find(x => x.userName === userToCreate.userName);
        expect(foundUser.name).toEqual(userToEdit.name);
      });
    });
  });
  it('should deleteUser', () => {
    const userToCreate: User = {
      userName: 'leynormendez',
      name: 'leynor',
      email: 'leinormendez@gmail.com',
      password: '123',
      role: 'Admin'
    };
    service.createUser(userToCreate).subscribe(result => {
      expect(result).toBeTrue();
      service.deleteUser(userToCreate.userName).subscribe(resultDelete => {
        expect(resultDelete).toBeTrue();
      });
    });

  });
});
