import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Router } from '@angular/router';
import { UserService } from '../../../../services/user-service/user-service.service';
import { User } from '../../../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers:[UserService]
})
export class LoginComponent implements OnInit {


  loginForm = new FormGroup({

    email: new FormControl(''),
    password: new FormControl('')

  });
  users: User[];
  usuario: User;

  constructor(private router: Router) {
  }

  ngOnInit(): void {

  }

   onLogin(): void {

  }


}
