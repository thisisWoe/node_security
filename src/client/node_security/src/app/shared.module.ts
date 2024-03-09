import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

const impExp = [FormsModule,
  ReactiveFormsModule]

@NgModule({
  declarations: [],
  imports: impExp,
  exports: impExp
})
export class SharedModule {
}
