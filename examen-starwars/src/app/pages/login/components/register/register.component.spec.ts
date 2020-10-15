import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [RouterTestingModule, FormsModule, ReactiveFormsModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should onRegister', () => {

    component.registerForm.get('role').setValue('Admin');
    component.registerForm.get('email').setValue('Leynor@gmail.com');
    component.registerForm.get('userName').setValue('Leynormendez');
    component.registerForm.get('password').setValue('123');
    component.registerForm.get('name').setValue('Leynor');
    spyOn(component.userService, 'createUser').and.returnValue(new Observable<boolean>(x => x.next(true)));
    component.onRegister();
    expect(component.userService.createUser).toHaveBeenCalled();
  });
});
