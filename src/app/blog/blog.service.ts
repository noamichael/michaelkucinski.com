import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { BlogPost } from './blog-post';
import { BlogCategory } from './blog-category';

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
  getSinglePostParams(id) {
    return { slug: id, _embed: true };
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
  getPosts(page: number) {
    this.page = page;
    return this.http.get(this.path + 'posts', {
      search: {
        page,
        count: this.count
      }
    }).map(r => r.json() as BlogPost);
  }
  getCategories(){
    return this.http.get(this.path + 'categories').map(r => r.json() as BlogCategory);
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
