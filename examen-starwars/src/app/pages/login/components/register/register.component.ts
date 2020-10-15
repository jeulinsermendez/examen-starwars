import { User } from './../../../../models/user.model';
import { UserService } from './../../../../services/user-service/user-service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    public userService: UserService,
    private router: Router ,
    private fromBuilder: FormBuilder ) {
  }

  ngOnInit(): void {
    this.registerForm = this.fromBuilder.group({
      role: [[], [Validators.required]],
      name: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
     });
  }

  onRegister(): void {
    if (this.registerForm.invalid){
      return;
    }
    const user: User = {
      role: this.registerForm.get('role').value,
      email: this.registerForm.get('email').value,
      userName: this.registerForm.get('userName').value,
      password: this.registerForm.get('password').value,
      name: this.registerForm.get('name').value,
    };
    this.userService.createUser(user).subscribe(result => {
      if (result) {
        this.router.navigate(['login']);
      }
    });
  }
}
