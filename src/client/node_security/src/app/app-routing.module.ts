import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full'},
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'register', loadChildren: () => import('./components/register.module').then(m => m.RegisterModule) },
  { path: 'login', loadChildren: () => import('./components/login/login/login.module').then(m => m.LoginModule) },
  { path: 'googleLog', loadChildren: () => import('./components/google/google-log/google-log.module').then(m => m.GoogleLogModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
