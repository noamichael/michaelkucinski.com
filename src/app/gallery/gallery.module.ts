import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AngularMdModule } from '../angular-md/angular-md.module';
import { GalleryComponent } from './gallery.component';
import { PhotoListComponent } from './photo-list/photo-list.component';
import { PhotoComponent } from './photo/photo.component';
import { PhotoSearchComponent, PhotosResolver } from './photo-search/photo-search.component';

@NgModule({
  imports: [
    CommonModule,
    AngularMdModule,
    RouterModule.forChild([
      {
        path: '',
        children: [
          {
            path: '',
            component: PhotoSearchComponent,
            resolve: {
              photos: PhotosResolver
            }
          }
        ]
      }
    ])
  ],
  providers: [PhotosResolver],
  declarations: [PhotoListComponent, PhotoComponent, PhotoSearchComponent]
})
export class GalleryModule { }
