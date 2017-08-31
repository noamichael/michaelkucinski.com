import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  MdToolbarModule,
  MdIconModule,
  //MdButtonModule,
  MdCardModule,
  MdGridListModule,
  MdInputModule,
  MdCheckboxModule
} from '@angular/material';

@NgModule({
  imports: [
    MdToolbarModule,
    MdIconModule,
    //MdButtonModule,
    MdCardModule,
    MdGridListModule,
    MdInputModule,
    MdCheckboxModule,
    FormsModule
  ],
  exports: [
    MdToolbarModule,
    MdIconModule,
    //MdButtonModule,
    MdCardModule,
    MdGridListModule,
    MdInputModule,
    MdCheckboxModule,
    FormsModule
  ]
})
export class AngularMdModule { }
