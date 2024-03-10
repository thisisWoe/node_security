import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PswChangeComponent } from './psw-change.component';

const routes: Routes = [{ path: '', component: PswChangeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PswChangeRoutingModule { }
