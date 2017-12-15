import { Injectable } from '@angular/core';
import 'rxjs/add/operator/mergeMap';
import { Http } from '@angular/http';

import { BlogPost } from './blog-post';
import { BlogCategory } from './blog-category';
import { BlogComment } from './blog-comment';

@Injectable()
export class BlogService {

  page: number
  count: number
  category: string

  constructor(
    private http: Http
  ) { }

  getPostsParams(page, count, category) {
    const params: { [s: string]: any } = { "page": page || 1, "count": count || 5, _embed: true };
    if (category) {
      params.categories = category;
    }
    return params;
  }
  get path() {
    return 'http://www.michaelkucinski.com/wp-blog/wp-json/wp/v2/';
  }

  canGoNext(meta) {
    //return !meta ? false : meta.pages > this.page;
  }
  canGoPrevious(meta) {
    //return !meta ? false : this.page > 1;
  }
  loadNenextxtPosts() {
    this.page++;
    this._getPosts();
  }
  loadPreviousPosts() {
    this.page--;
    this._getPosts();
  }
  private _getPosts() {
    const params = this.getPostsParams(this.page, this.count, this.category);

  }

  getPost(id: string) {
    return this.http.get(this.path + 'posts', {
      search: {
        slug: id,
        _embed: true
      }
    })
      .map(r => r.json()[0] as BlogPost)
      .mergeMap(post => this.fetchAndAddCommentsToPost(post));
  }

  commentPath() {
    return this.path + 'comments';
  }

  private fetchAndAddCommentsToPost(post: BlogPost) {
    return this.http.get(this.commentPath(), { search: { post: post.id } })
      .map(r => {
        let comments = r.json() as BlogComment[];
        let commentCache = {};
        let rootComments: BlogComment[] = [];
        let childComments: BlogComment[] = [];

        comments.forEach(function (comment) {
          comment.children = [];
          commentCache[comment.id] = comment;
          if (comment.parent) {
            childComments.push(comment);
          } else {
            rootComments.push(comment);
          }
        });
        childComments.forEach(function (comment) {
          commentCache[comment.parent].children.push(comment);
        });
        post.comments = rootComments;
        return post;
      });
  }

  getPosts(page: number) {
    this.page = page;
    return this.http.get(this.path + 'posts', {
      search: {
        page,
        count: this.count,
        _embed: true
      }
    }).map(r => r.json() as BlogPost[]);
  }
  getCategories() {
    return this.http.get(this.path + 'categories').map(r => r.json() as BlogCategory[]);
  }

  comment(comment: {
    post: number,
    parent?: number,
    content: string,
    author_name: string,
    author_email: string
  }) {
    this.http.post(this.commentPath(), comment);

  }
  searchForPosts(searchText, page, count) {
    return this.http.get(this.path + `get_search_results`, {
      method: "GET",
      search: {
        search: encodeURIComponent(searchText),
        page,
        count,
        post_type: 'post'
      }
    });
  }
}
