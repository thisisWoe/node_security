import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'api/app-angular', redirectTo: 'auth', pathMatch: 'full'},
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'register', loadChildren: () => import('./components/register.module').then(m => m.RegisterModule) },
  { path: 'login', loadChildren: () => import('./components/login/login/login.module').then(m => m.LoginModule) },
  // { path: 'googleLog', loadChildren: () => import('./components/google/google-log/google-log.module').then(m => m.GoogleLogModule) },
  { path: 'googleLog', loadChildren: () => import('./components/google/google-log/google-log.module').then(m => m.GoogleLogModule) },
  { path: 'resetPsw', loadChildren: () => import('./components/reset-psw/reset-psw.module').then(m => m.ResetPswModule) },
  { path: 'pswChange/:token', loadChildren: () => import('./components/psw-change/psw-change.module').then(m => m.PswChangeModule) },
  { path: 'confirmRegistration/:token', loadChildren: () => import('./components/confirm-registration/confirm-registration.module').then(m => m.ConfirmRegistrationModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
