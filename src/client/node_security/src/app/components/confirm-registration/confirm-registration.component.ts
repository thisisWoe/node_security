import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {firstValueFrom} from "rxjs";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-confirm-registration',
  templateUrl: './confirm-registration.component.html',
  styleUrl: './confirm-registration.component.scss'
})
export class ConfirmRegistrationComponent implements OnInit {
  token: string | null;
  tokenError: string | null | undefined = null;
  logged: boolean = false;
  successText: string | null | undefined= null;


  constructor(private actRouter: ActivatedRoute, private fb: FormBuilder, private authSvc: AuthService, private router: Router) {
    this.token = null;
  }

  async ngOnInit() {
    this.token = this.actRouter.snapshot.paramMap.get('token');
    if (!this.token) {
      this.tokenError = 'Non sei autorizzato a concludere questa operazione.';
      return;
    }

    try {
      const resConfirmRegistration = await firstValueFrom(this.authSvc.confirmRegistration(this.token));
      console.log(resConfirmRegistration);
      this.logged = true;
      this.successText = (resConfirmRegistration as any).message;
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 5000);
    } catch (e) {
      const error:HttpErrorResponse = e as HttpErrorResponse;
      console.log(error.error);
      this.tokenError = error.error.message;
      setTimeout(() => {
        this.router.navigate(['/auth']);
      }, 5000);
    }


  }

}
