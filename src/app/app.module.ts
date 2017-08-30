import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMdModule } from './angular-md/angular-md.module';
import { NgModule } from '@angular/core';
import { FlickrService } from './flickr/flickr.service';
import 'hammerjs';

import { AppComponent } from './app.component';
import { MkHomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    MkHomeComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AngularMdModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: MkHomeComponent
      },
      {
        path: 'contact',
        loadChildren: 'app/contact/contact.module#ContactModule'
      },
      {
        path: 'gallery',
        loadChildren: 'app/gallery/gallery.module#GalleryModule'
      }
    ])
  ],
  providers: [
    FlickrService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
