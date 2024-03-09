import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {firstValueFrom} from "rxjs";

export interface loginDTO {
  username: string,
  password: string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  invalidCredentials: boolean = false;
  showPassword: boolean = false;
  logged: boolean = false;

  constructor(private fb: FormBuilder, private authSvc: AuthService, private router: Router) {
    this.form = this.fb.group({
      username: [null, [
        Validators.required,
        Validators.pattern(/^\S{4,20}$/)]
      ],
      // Assicurati che la password abbia almeno 8 caratteri, lettere minuscole, maiuscole, numeri e caratteri speciali
      password: [null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)]],
    });
  }

  ngOnInit(): void {

  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  async onSubmit() {
    if (this.form.invalid) {
      this.invalidCredentials = true;
      return;
    }

    const loginDTO: loginDTO = this.form.value;
    console.log(loginDTO);
    try {
      const resLogin = await firstValueFrom(this.authSvc.signIn(loginDTO));
      console.log(resLogin);
      this.form.reset();
      this.form.disable();
      this.logged = true;
      setTimeout(() => {
        this.router.navigate(['/auth']);
      }, 5000)
    } catch (e) {
      console.error('errore', e);
      this.invalidCredentials = true;
    }

  }

}
