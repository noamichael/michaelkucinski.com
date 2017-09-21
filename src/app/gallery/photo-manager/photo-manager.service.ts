import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';

import { FlickrPhoto, FlickrResponse, FlickrService } from '../../flickr/flickr.service';

interface SearchCriteria {
  page?: number
  perPage?: number
  text?: string,
  tags?: string
}

const pendingNext = [];
export function shallowClone(obj: any) {
  const clone = {};
  for (let key in obj) {
    clone[key] = obj[key];
  }
  return clone;
}
@Injectable()
export class PhotoManagerService {
  private lastSearch: SearchCriteria
  private lastResponse: FlickrResponse


  constructor(
    private flickrService: FlickrService,
    private router: Router
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


  canGoNext() {
    return this.lastSearch && this.lastSearch.page < this.lastSearch.page;
  }
  canGoPrevious() {
    return this.lastSearch && this.lastSearch.page > 1;
  }

  hasPhotos() {
    return !!this.lastResponse;
  }

  navigateNext(photo: FlickrPhoto) {
    this.navigateBy(photo, (c) => c + 1);
  }
  navigatePrevious(photo: FlickrPhoto) {
    this.navigateBy(photo, (c) => c - 1);
  }

  equalsLastSearch(search: SearchCriteria) {
    return this.lastSearch
      && this.lastSearch.page == search.page
      && this.lastSearch.perPage == search.perPage
      && this.lastSearch.text == search.text
      && this.lastSearch.tags == search.tags;

  }

  private navigateBy(photo: FlickrPhoto, paginator: (n: number) => number) {
    const photos = this.photos;
    const currentIndex = this.findPhotoIndex(photo);
    const search: SearchCriteria = this.lastSearch ? shallowClone(this.lastSearch) : {};

    if (currentIndex < 0) {//not found. Go to first photo
      return this.getPhotos({}).then(r => {
        this.navigateToPhoto(this.photos[0]);
      });
    }

    const nextIndex = paginator(currentIndex);

    if (nextIndex === photos.length) { //outside of page
      //go forward
    } else if (nextIndex < 0) {
      //page back
    } else {
      //we have it
      this.navigateToPhoto(photos[nextIndex]);
    }

  }

  private navigateToPhoto(photo: FlickrPhoto) {
    this.router.navigate(['/gallery', photo.id]);
  }

  private findPhotoIndex(photo: FlickrPhoto) {
    let index = -1;
    for (let i = 0; i < this.photos.length; i++) {
      if (this.photos[i].id === photo.id) {
        return i;
      }
    }
    return index;
  }

  private get photos() {
    return this.lastResponse.photos.photo;
  }

}
