import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  hide = true;

  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  loginForm = this.formBuilder.group({
    username: '',
    password: '',
  });

  onSubmit() {
    this.login();
  }

  private login() {
    this.authService
      .login(
        this.loginForm.get('username')?.value || '',
        this.loginForm.get('password')?.value || ''
      )
      .subscribe((res) => {
        if (res?.length > 0) {
          this.router.navigate(['/admin/animales']);
        }
      });
  }
}
