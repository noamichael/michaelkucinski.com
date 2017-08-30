import { Component, OnInit } from '@angular/core';
import { FlickrService, FlickrPhoto, FlickrResponse } from '../flickr/flickr.service';

@Component({
  selector: 'mk-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class MkHomeComponent implements OnInit {

  photos: FlickrPhoto[]
  photoIndex = 0
  intervalId: any
  currentPhoto: string
  nextPhoto: string
  needToLoadNext = true

  constructor(
    private flickrService: FlickrService
  ) { }

  ngOnInit() {
    this.flickrService.getHomePhotos().subscribe(r => {
      this.setupImages(r);
    })
  }

  setupImages(photoMeta: FlickrResponse) {
    this.photos = photoMeta.photos.photo;
    this.changeBackground();
  }

  onImageLoad() {
    setTimeout(() => this.changeBackground(), 5 * 1000);
  }

  changeBackground() {
    this.currentPhoto = FlickrService.getPhotoUrl(this.photos[this.photoIndex++], FlickrService.sizes.large1600);
    if (this.photoIndex >= 10) {
      this.photoIndex = 0;
      this.needToLoadNext = false;
      if (!this.intervalId) {
        this.intervalId = setInterval(() => this.changeBackground(), 5 * 1000);
      }
    }
    if (this.needToLoadNext) {
      this.nextPhoto = FlickrService.getPhotoUrl(this.photos[this.photoIndex]);
    }
  }

}
