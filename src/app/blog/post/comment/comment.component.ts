import { Component, OnInit, Input } from '@angular/core';

import { BlogPost } from '../../blog-post';
import { BlogComment } from '../../blog-comment';

@Component({
  selector: 'mk-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  shouldReply: boolean

  @Input()
  comment: BlogComment
  @Input()
  parent: BlogComment
  @Input()
  post: BlogPost
  @Input()
  even: boolean

  constructor() { }

  ngOnInit() {
  }

  replyIcon() {
    return this.shouldReply ? 'cancel' : 'reply';
  }
  getChildEvenOrOdd(n: number) {
    if (this.even) {
      return n % 2 !== 0;
    }
    return n % 2 === 0;
  }
  toggleReply() {
    this.shouldReply = !this.shouldReply;
  }
  replyTitle() {
    return this.shouldReply ? 'Cancel' : 'Reply';
  }

}
