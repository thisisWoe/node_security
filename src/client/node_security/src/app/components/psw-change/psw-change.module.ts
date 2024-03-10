import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PswChangeRoutingModule } from './psw-change-routing.module';
import { PswChangeComponent } from './psw-change.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../shared.module";


@NgModule({
  declarations: [
    PswChangeComponent
  ],
    imports: [
        CommonModule,
        PswChangeRoutingModule,
        SharedModule,
    ]
})
export class PswChangeModule { }
