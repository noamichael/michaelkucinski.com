import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

import { FlickrPhoto, FlickrResponse, FlickrService } from '../../flickr/flickr.service';

interface SearchCriteria {
  page?: number
  perPage?: number
  text?: string,
  tags?: string
}

const pendingNext = [];

@Injectable()
export class PhotoManagerService {
  private lastSearch: SearchCriteria
  private lastResponse: FlickrResponse
  private page: number
  private pages: number
  private photos: FlickrPhoto[] = []


  constructor(
    private flickrService: FlickrService
  ) { }

  getPhotos(search: SearchCriteria) {
    if (this.lastResponse && this.equalsLastSearch(search)) {
      return Promise.resolve(this.lastResponse);
    }
    this.lastSearch = search;
    return this.flickrService.getPhotos(
      search.page,
      search.perPage,
      search.text,
      search.tags
    ).toPromise()
      .then(response => {
        this.lastResponse = response;
        return response;
      });

  }

  next() {
    this.page++;
  }

  previous() {
    this.page--;
  }

  canGoNext() {
    return this.page < this.pages
  }
  canGoPrevious() {
    return this.page < this.pages
  }

  equalsLastSearch(search: SearchCriteria) {
    return this.lastSearch
      && this.lastSearch.page == search.page
      && this.lastSearch.perPage == search.perPage
      && this.lastSearch.text == search.text
      && this.lastSearch.tags == search.tags;

  }

}
