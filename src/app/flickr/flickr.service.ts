import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { FlickrPhoto } from './flickr-photo';
import { FlickrResponse } from './flickr-response';

export * from './flickr-photo';
export * from './flickr-response';

const API_KEY = 'e64d91b72c3934917da3554a69c98ef3';
const USER_ID = '89564538@N00';


@Injectable()
export class FlickrService {

  static sizes = {
    smallSquare: 's', // s	small square 75x75
    largeSquare: 'q', // q	large square 150x150
    thumbnail: 't',   // t	thumbnail, 100 on longest side
    small240: 'm',    // m	small, 240 on longest side
    small320: 'n',    // n	small, 320 on longest side
    medium500: '-',    // -	medium, 500 on longest side
    medium640: 'z', // z	medium 640, 640 on longest side
    medium800: 'c',// c	medium 800, 800 on longest side†
    large1024: 'b',/// b	large, 1024 on longest side*
    large1600: 'h',/// h	large 1600, 1600 on longest side†
    large2048: 'k',/// k	large 2048, 2048 on longest side†
    original: 'o',/// o	original image, either a jpg, gif or png, depending on source format
  }

  constructor(
    private http: Http
  ) { }

  getHomePhotos() {
    return this.doGet(
      this.getUrlSearchParams(1, 10, null, ['for-sale'])
    );
  }

  getPhoto(photoId: string) {
    return this.doGet(
      this.getSinglePhotoUrlParams(photoId)
    );
  }

  getPhotos(page: number, perPage: number, text: string, ...tags: string[]) {
    return this.doGet(
      this.getUrlSearchParams(page, perPage, text, tags)
    );
  }

  private doGet(query: URLSearchParams) {
    return this.http.get(FlickrService.baseUrl(), { search: query })
      .map(response => response.json() as FlickrResponse);
  }

  static baseUrl() {
    return 'https://api.flickr.com/services/rest';
  }
  static getPhotoListStyle(photo: FlickrPhoto, size?: string) {
    if (!photo) {
        return '';
    }
    return `${this.getPhotoStyle(photo, size)} cursor: pointer;`;
}

  static getPhotoStyle(photo: FlickrPhoto, size: string) {
    return `background-image: url(${FlickrService.getPhotoUrl(photo, size)});`;
  }
  static getPhotoUrl(photo: FlickrPhoto, size: string = 'z') {
    if (!photo) {
      return '';
    }
    return `https://farm${photo.farm}.staticflickr.com/${photo.server}/${(photo.primary || photo.id)}_${photo.secret}_${size}.jpg`;

  }

  private getUrlSearchParams(page = 1, perPage = 35, text: string, tags: string[] = []) {
    const params = {
      method: 'flickr.photos.search',
      api_key: API_KEY,
      user_id: USER_ID,
      tag_mode: 'all',
      tags: tags.join(','),
      format: 'json',
      nojsoncallback: '1',
      per_page: perPage.toString(),
      page: page.toString()
    };
    if (text) {
      params['text'] = text;
    }
    return this.toQuery(params);
  }

  private getSinglePhotoUrlParams(photoId: string) {
    return this.toQuery({
      method: 'flickr.photos.getInfo',
      api_key: API_KEY,
      photo_id: photoId,
      format: 'json',
      nojsoncallback: '1'
    });
  }

  private toQuery(params: { [key: string]: string }) {
    let urlSearchParams = new URLSearchParams();
    for (let key in params) {
      urlSearchParams.set(key, params[key]);
    }
    return urlSearchParams;
  }

}
