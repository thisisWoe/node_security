import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-psw-change',
  templateUrl: './psw-change.component.html',
  styleUrl: './psw-change.component.scss'
})
export class PswChangeComponent implements OnInit {
  form: FormGroup;
  token: string | null;
  showPassword: boolean = false;
  pswSubmitted: boolean = false;
  successText: string | null | undefined = null;
  passwordInvalid: boolean = false;
  confPasswordInvalid: boolean = false;
  tokenError:string | null | undefined = null;

  constructor(private actRouter: ActivatedRoute, private fb: FormBuilder, private authSvc: AuthService, private router: Router) {
    this.token = null;
    this.form = this.fb.group({
      password: [null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)]],
      confirmPassword: [null, [Validators.required, this.passwordMatchValidator()]]
    });
  }

  ngOnInit(): void {
    this.token = this.actRouter.snapshot.paramMap.get('token');
    if (!this.token) this.tokenError = 'Non sei autorizzato a concludere questa operazione.';
    console.log(this.token);
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  async navigateToLogin() {
    await this.router.navigate(['/login']);
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

    if (this.form.get('password')?.invalid) this.passwordInvalid = true;
    if (this.form.get('confirmPassword')?.invalid) this.confPasswordInvalid = true;
    if (!this.token) this.tokenError = 'Non sei autorizzato a concludere questa operazione.';
    if (this.form.invalid) return;

    console.log(this.form.value);
    try {

    const resChangepassword = await firstValueFrom(this.authSvc.changePassword(this.token!, this.form.get('password')?.value));
    console.log(resChangepassword);
    this.pswSubmitted = true;
    this.successText = (resChangepassword as any).message;
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 5000)
    } catch (e) {
      console.log(e);
      this.form.disable();
      setTimeout(() => {
        this.router.navigate(['/auth']);
      }, 5000)
    }
  }

}
