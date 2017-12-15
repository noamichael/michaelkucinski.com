import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { BlogPost } from '../blog-post';
import { BlogComment } from '../blog-comment';

@Component({
  selector: 'mk-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input()
  full: boolean = false
  @Input()
  post: BlogPost
  @Output()
  readMore = new EventEmitter<BlogPost>()

  constructor() { }

  ngOnInit() {
  }
  getAuthor(post) {
    return post ? post._embedded.author[0].name : undefined;
  }
  _getPostContent(post) {
    let html = post.content.rendered;
    return this.full ? html : this.limitHtml(html, 350);
  }
  limitHtml(text, limit) {
    let changedString = String(text).replace(/<[^>]+>/gm, '');
    let finalString = changedString.length > limit ? changedString.substr(0, limit - 1) + "..." : changedString;
    return finalString;
  }

  bubbleReadMore() {
    this.readMore.emit(this.post);
  }
}
