import { User } from './../../../../models/user.model';
import { UserService } from './../../../../services/user-service/user-service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterServiceService } from './register-service.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  user: User;

  constructor(private registerServiceService: RegisterServiceService, private router: Router, private fromBuilder: FormBuilder) {


  }

  ngOnInit(): void {
    this.registerForm = this.fromBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
     });
  }
  onRegister(): void {
if(this.registerForm.invalid){
  return;
}
  console.log(this.registerForm.value)
   // this.user = new User(username, email, password);
    //this.registerServiceService.onRegister(this.user);
  }
}
