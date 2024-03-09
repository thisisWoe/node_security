import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GoogleLogRoutingModule } from './google-log-routing.module';
import { GoogleLogComponent } from './google-log.component';


@NgModule({
  declarations: [
    GoogleLogComponent
  ],
  imports: [
    CommonModule,
    GoogleLogRoutingModule
  ]
})
export class GoogleLogModule { }
