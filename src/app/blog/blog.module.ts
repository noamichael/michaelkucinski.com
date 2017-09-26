import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AngularMdModule } from '../angular-md/angular-md.module';
import { BlogComponent, PostsResolver, CategoriesResolver } from './blog.component';
import { BlogService } from './blog.service';

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
            component: BlogComponent,
            resolve: {
              posts: PostsResolver,
              categories: CategoriesResolver
            }
          }

        ]
      }
    ])
  ],
  providers: [
    BlogService,
    PostsResolver,
    CategoriesResolver
  ],
  declarations: [
    BlogComponent
  ]
})
export class BlogModule { }
