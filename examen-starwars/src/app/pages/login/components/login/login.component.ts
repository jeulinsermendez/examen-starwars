import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../../services/user-service/user-service.service';
import { AuthenticationService } from '../../../../core/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  error: string;

  constructor(
    private router: Router,
    public authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  onLogin(): void {
    this.authenticationService.login(
      this.loginForm.get('userName').value,
      this.loginForm.get('password').value).subscribe(result => {
          if (result){
            this.router.navigate(['/starships']);
          } else {
              this.error = 'Email o contraseña incorrecta.';
          }
      });
  }

  initForm(): void {
    this.loginForm = new FormGroup({
      userName: new FormControl(''),
      password: new FormControl('')
    });
  }
}
