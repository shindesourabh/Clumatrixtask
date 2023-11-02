import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = true;
  constructor( private authenticationService : AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      password: new FormControl('', Validators.required)
    });
  }
  login() {
    debugger
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    console.log(email, password)
    this.authenticationService
      .login(String(email), password)
      .subscribe(
        data => {
          this.loading = false;
          this.router.navigate(['/dashboard']);
        },
        error => {
          this.loading = false;
          alert('authentication Fail')

        }
      );
  }


}
