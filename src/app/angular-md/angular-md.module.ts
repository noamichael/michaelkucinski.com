import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatGridListModule,
  MatInputModule,
  MatCheckboxModule,
  MatProgressSpinnerModule,
  MatListModule
} from '@angular/material';

@NgModule({
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatListModule,
    FormsModule
  ],
  exports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatListModule,
    FormsModule
  ]
})
export class AngularMdModule { }
