import { Injectable } from '@angular/core';
import { UserService } from '../../../../services/user-service/user-service.service';
import { User } from '../../../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterServiceService {

  constructor(public userService: UserService) { }

  onRegister(user: User): void {
    this.userService.existsUser(user.username).subscribe(response => {
    if(!response){
      this.userService.createUser(user).subscribe(resp =>{
        if(resp){
          console.log("USUARIO CREADO");
        }
      });
    }else{
      console.log("ESTE USUARIO YA EXISTE");
    }});


  }
}
