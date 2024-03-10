import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResetPswComponent } from './reset-psw.component';

const routes: Routes = [{ path: '', component: ResetPswComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResetPswRoutingModule { }
