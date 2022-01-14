import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../login-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  isSuccess: boolean = false;
  constructor(private loginService: LoginService) {
    this.isSuccess = false;
    this.loginForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  onChange() {
    this.isSuccess = false;
  }

  onLogin() {
    if(this.loginForm.valid) {
    let result = this.loginService.getLoginCredentials(this.loginForm.get('userName')?.value, this.loginForm.get('password')?.value);
    result.then((login) => {
      if(login.loginSuccessful) {
       this.isSuccess = true;
      }
      else {
        this.isSuccess = false;
      }
    })  
    } 
  }
}