import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {firstValueFrom} from "rxjs";

export interface googleRes {
  error?: string | null,
  authToken?: string | null
}

@Component({
  selector: 'app-google-log',
  templateUrl: './google-log.component.html',
  styleUrl: './google-log.component.scss'
})
export class GoogleLogComponent implements OnInit {
  errorLog: boolean = false;
  errorText: string | null | undefined = null;
  logged: boolean = false;

  constructor(private authSvc: AuthService, private router: Router) {
  }

  async ngOnInit() {
    await this.logGoogle();
  }

  async logGoogle() {
    const resGoogle: googleRes = await firstValueFrom(this.authSvc.signInGoogle());
    console.log(resGoogle);
    if (resGoogle.error) {
      this.errorText = resGoogle.error;
      this.errorLog = true;
      setTimeout(() => {
        this.router.navigate(['/auth']);
      }, 5000);
    } else {
      this.logged = true;
      setTimeout(() => {
        this.router.navigate(['/auth']);
      }, 5000);
    }
  }

}
