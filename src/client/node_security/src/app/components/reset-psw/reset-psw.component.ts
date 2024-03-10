import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {firstValueFrom} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-reset-psw',
  templateUrl: './reset-psw.component.html',
  styleUrl: './reset-psw.component.scss'
})
export class ResetPswComponent {
  form: FormGroup;
  emailSubmitted: boolean = false;
  successText: string | null | undefined = null;
  invalidText: string | null | undefined = null;
  invalidCredentials: boolean = false;

  constructor(private fb: FormBuilder, private authSvc: AuthService, private router: Router) {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
    });
  }

  async onSubmit() {
    if (this.form.valid) {
      try {
        const resSendEmail = await firstValueFrom(this.authSvc.submitEmailResetPsw(this.form.get('email')?.value));
        console.log(resSendEmail);
        this.emailSubmitted = true;
        this.successText = (resSendEmail as any).message as string;
        setTimeout(() => {
          this.router.navigate(['/auth']);
        }, 5000)
      } catch (error) {
        this.invalidCredentials = true;
        this.invalidText = (error as HttpErrorResponse).error.error;
      }
    }
  }

}
