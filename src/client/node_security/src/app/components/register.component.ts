import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {firstValueFrom} from "rxjs";
import {Router} from "@angular/router";
import {error} from "winston";
import * as http from "http";
import {HttpErrorResponse} from "@angular/common/http";

export interface SignUpDTO {
  email: string,
  username: string,
  password: string
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  emailInvalid: boolean = false;
  usernameInvalid: boolean = false;
  passwordInvalid: boolean = false;
  confPasswordInvalid: boolean = false;
  showPassword: boolean = false;
  registered: boolean = false;
  serverError: boolean = false;
  serverErrorText: string | null | undefined = null;

  constructor(private fb: FormBuilder, private authSvc: AuthService, private router: Router) {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      username: [null, [
        Validators.required,
        Validators.pattern(/^\S{4,20}$/)]
      ],
      // Assicurati che la password abbia almeno 8 caratteri, lettere minuscole, maiuscole, numeri e caratteri speciali
      password: [null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)]],
      confirmPassword: [null, [Validators.required, this.passwordMatchValidator()]]
    });
  }

  ngOnInit(): void {

  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.parent || !control) {
        return null;
      }

      const password = control.parent.get('password')?.value;
      const confirmPassword = control.value;

      // Controlla se i valori corrispondono
      return password === confirmPassword ? null : {'passwordMismatch': true};
    };
  }


  async onSubmit() {
    this.form.get('confirmPassword')?.updateValueAndValidity();

    if (this.form.get('email')?.invalid) this.emailInvalid = true;
    if (this.form.get('username')?.invalid) this.usernameInvalid = true;
    if (this.form.get('password')?.invalid) this.passwordInvalid = true;
    if (this.form.get('confirmPassword')?.invalid) this.confPasswordInvalid = true;

    if (this.form.invalid) return;

    const signUpDTO: SignUpDTO = {
      email: this.form.get('email')?.value,
      username: this.form.get('username')?.value,
      password: this.form.get('password')?.value
    }

    console.log(signUpDTO);
    try {
      const resSignUp = await firstValueFrom(this.authSvc.signUp(signUpDTO));
      console.log(resSignUp);
      this.form.reset();
      this.form.disable();

      this.registered = true;
      setTimeout(() => {
        this.router.navigate(['/auth']);
      }, 5000)

    } catch (error) {
      const _error :HttpErrorResponse = error as HttpErrorResponse;
      console.log(_error);
      console.log(_error.error.error);
      this.serverError = true;
      this.serverErrorText = _error.error.message;
    }
  }
}
