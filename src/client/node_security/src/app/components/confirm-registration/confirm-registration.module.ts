import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmRegistrationRoutingModule } from './confirm-registration-routing.module';
import { ConfirmRegistrationComponent } from './confirm-registration.component';
import {SharedModule} from "../../shared.module";


@NgModule({
  declarations: [
    ConfirmRegistrationComponent
  ],
  imports: [
    CommonModule,
    ConfirmRegistrationRoutingModule,
    SharedModule,
  ]
})
export class ConfirmRegistrationModule { }
