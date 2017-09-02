import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AngularMdModule } from '../angular-md/angular-md.module';
import { PhotoListComponent } from './photo-list/photo-list.component';
import { PhotoComponent } from './photo/photo.component';
import { PhotoSearchComponent,PhotosResolver } from './photo-search/photo-search.component';
import { PhotoDetailComponent, PhotoResolver } from './photo-detail/photo-detail.component';
import { PhotoManagerService } from './photo-manager/photo-manager.service';

@NgModule({
  imports: [
    CommonModule,
    AngularMdModule,
    RouterModule.forChild([
      {
        path: '',
        resolve: {
          photosResponse: PhotosResolver
        },
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
        children: [
          {
            path: '',
            component: PhotoSearchComponent,

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
  providers: [
    PhotosResolver,
    PhotoResolver,
    PhotoManagerService
  ],
  declarations: [
    PhotoListComponent,
    PhotoComponent,
    PhotoSearchComponent,
    PhotoDetailComponent
  ]
})
export class GalleryModule { }
