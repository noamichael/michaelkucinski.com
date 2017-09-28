import { Component, OnInit, Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute, Router } from '@angular/router';

import { BlogService } from '../blog.service';
import { BlogPost } from '../blog-post';

@Component({
  selector: 'mk-full-post',
  templateUrl: './full-post.component.html',
  styleUrls: ['./full-post.component.css']
})
export class FullPostComponent implements OnInit {

  post: BlogPost

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.post = data.post;
    });
  }

  back() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

}

@Injectable()
export class PostResolver implements Resolve<BlogPost> {

  constructor(
    private blogService: BlogService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.blogService.getPost(route.params.slug);
  }
}