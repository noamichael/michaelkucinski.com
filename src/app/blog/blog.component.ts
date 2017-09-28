import { Component, OnInit, Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute, Router } from '@angular/router';

import { BlogService } from './blog.service';
import { BlogPost } from './blog-post';
import { BlogCategory } from './blog-category';

@Component({
  selector: 'mk-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  posts: BlogPost[]
  categories: BlogCategory

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.posts = data.posts;
      this.categories = data.categories;
    });
  }

  readMore(post: BlogPost) {
    this.router.navigate(['./', post.slug], { relativeTo: this.route });
  }

}

@Injectable()
export class PostsResolver implements Resolve<BlogPost[]> {

  constructor(
    private blogService: BlogService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.blogService.getPosts(route.params.page);
  }
}

@Injectable()
export class CategoriesResolver implements Resolve<BlogCategory[]> {

  constructor(
    private blogService: BlogService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.blogService.getCategories();
  }
}