import { Component, OnInit, Input } from '@angular/core';

import { BlogService } from '../../../blog.service';
import { BlogPost } from '../../../blog-post';
import { BlogComment } from '../../../blog-comment';

let lastId = 0;

@Component({
  selector: 'mk-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.css']
})
export class CreateCommentComponent implements OnInit {
  @Input()
  post: BlogPost
  @Input()
  parentComment: BlogComment
  comment: any
  id: number

  constructor(
    private blogService: BlogService
  ) {
    this.id = ++lastId;
  }

  ngOnInit() {
    this.initComment();
  }

  initComment() {
    this.comment = {
      author: {},
      content: ''
    };
  }

  saveComment(){
    // this.blogService.comment({
    //   author_email: t
    // });
  }

}
