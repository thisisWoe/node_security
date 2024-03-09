import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoogleLogComponent } from './google-log.component';

const routes: Routes = [{ path: '', component: GoogleLogComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GoogleLogRoutingModule { }
