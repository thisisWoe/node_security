import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ResetPswRoutingModule} from './reset-psw-routing.module';
import {ResetPswComponent} from './reset-psw.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../shared.module";


@NgModule({
  declarations: [
    ResetPswComponent
  ],
  imports: [
    CommonModule,
    ResetPswRoutingModule,
    SharedModule,
  ]
})
export class ResetPswModule {
}
