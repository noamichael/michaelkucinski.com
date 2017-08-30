import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AngularMdModule } from '../angular-md/angular-md.module';
import { ContactComponent } from './contact.component';

@NgModule({
  imports: [
    CommonModule,
    AngularMdModule,
    RouterModule.forChild([
      {
        path: '',
        component: ContactComponent
      }
    ]),
  ],
  declarations: [ContactComponent]
})
export class ContactModule { }
