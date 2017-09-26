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
  MdProgressSpinnerModule,
  MdListModule
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
    MdProgressSpinnerModule,
    MdListModule
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
    MdProgressSpinnerModule,
    MdListModule
  ]
})
export class AngularMdModule { }
