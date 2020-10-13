import { Injectable } from '@angular/core';
import { UserService } from '../../../../services/user-service/user-service.service';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private userService: UserService) {
   }
}
