import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  MdToolbarModule,
  MdIconModule,
  MdButtonModule,
  MdCardModule,
  MdGridListModule,
  MdInputModule,
  MdCheckboxModule,
  MdProgressSpinnerModule
} from '@angular/material';

@NgModule({
  imports: [
    MdToolbarModule,
    MdIconModule,
    MdButtonModule,
    MdCardModule,
    MdGridListModule,
    MdInputModule,
    MdCheckboxModule,
    FormsModule,
    MdProgressSpinnerModule
  ],
  exports: [
    MdToolbarModule,
    MdIconModule,
    MdButtonModule,
    MdCardModule,
    MdGridListModule,
    MdInputModule,
    MdCheckboxModule,
    FormsModule,
    MdProgressSpinnerModule
  ]
})
export class AngularMdModule { }
