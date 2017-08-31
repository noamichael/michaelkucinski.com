import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AngularMdModule } from '../angular-md/angular-md.module';
import { GalleryComponent } from './gallery.component';
import { PhotoListComponent } from './photo-list/photo-list.component';
import { PhotoComponent } from './photo/photo.component';
import { PhotoSearchComponent, PhotosResolver } from './photo-search/photo-search.component';
import { PhotoDetailComponent, PhotoResolver } from './photo-detail/photo-detail.component';

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
          },
          {
            path: ':id',
            component: PhotoDetailComponent,
            resolve: {
              photo: PhotoResolver
            }
          }
        ]
      }
    ])
  ],
  providers: [PhotosResolver, PhotoResolver],
  declarations: [PhotoListComponent, PhotoComponent, PhotoSearchComponent, PhotoDetailComponent]
})
export class GalleryModule { }
