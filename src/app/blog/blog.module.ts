import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AngularMdModule } from '../angular-md/angular-md.module';
import { BlogComponent, PostsResolver, CategoriesResolver } from './blog.component';
import { BlogService } from './blog.service';
import { PostComponent } from './post/post.component';
import { CommentComponent } from './post/comment/comment.component';
import { FullPostComponent, PostResolver } from './full-post/full-post.component';
import { CreateCommentComponent } from './post/comment/create-comment/create-comment.component';

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
          },
          {
            path: ':slug',
            component: FullPostComponent,
            resolve: {
              post: PostResolver
            }
          }

        ]
      }
    ])
  ],
  providers: [
    BlogService,
    PostsResolver,
    CategoriesResolver,
    PostResolver
  ],
  declarations: [
    BlogComponent,
    PostComponent,
    CommentComponent,
    FullPostComponent,
    CreateCommentComponent
  ]
})
export class BlogModule { }
