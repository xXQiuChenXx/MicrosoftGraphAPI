import { Component } from '@angular/core';

import { AuthService } from '../auth/auth.service';
//login page
@Component({
  selector: 'app-login',
  template: `
    <button (click)="login()">Login with your Microsoft account</button>
  `
})
export class LoginComponent {
  constructor(private authService: AuthService) {}

  login() {
    //redirects to auth service.ts
    this.authService.login();
  }
}
