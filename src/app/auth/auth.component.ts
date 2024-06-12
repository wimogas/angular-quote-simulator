import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthResponseData, AuthService} from "./services/auth.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  authForm: FormGroup;

  isSignUp: boolean = false;
  isLoading: boolean = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  switchMode() {
    this.isSignUp = !this.isSignUp;
    if (this.isSignUp) {
      this.authForm.addControl('password2', new FormControl('', [Validators.required, Validators.minLength(6)]) )
    } else {
      this.authForm.removeControl('password2');
    }
  }

  onSubmit() {
    const email = this.authForm.controls['email'].value
    const password = this.authForm.controls['password'].value

    if (this.isSignUp) {
      const password2 = this.authForm.controls['password2'].value
      if (password !== password2) {
        return
      }
    }

    this.isLoading = true

    let authFn: Observable<AuthResponseData>

    if (this.isSignUp) {
      authFn = this.authService.signUp(email, password)
    } else {
      authFn = this.authService.signIn(email, password)
    }

    authFn.subscribe({
      next: data => {
        console.log(data)
        this.isLoading = false
        this.router.navigate(['/'])
      } ,
      error: errorMessage => {
        this.error = errorMessage
        this.isLoading = false
      }
    })
  }
}
