import { Component, OnInit, OnChanges, Input, Output, HostListener, EventEmitter } from '@angular/core';

import { FlickrPhoto, FlickrService } from '../../flickr/flickr.service';

type BuyType = 'FILE' | 'PRINT';
interface PaginationEvent { photo: FlickrPhoto }

interface BuyEvent extends PaginationEvent {
  buy: BuyType,
  url: string
}

@Component({
  selector: 'mk-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit, OnChanges {

  loading: boolean
  fullPhoto: FlickrPhoto

  @Input()
  photo: FlickrPhoto

  @Output()
  buy: EventEmitter<BuyEvent> = new EventEmitter()

  constructor(
    private flickrService: FlickrService
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes) {
    //TODO: Load full photo details
    if (changes.photo && this.photo) {
      this.loading = true;
      this.flickrService.getPhoto(this.photo.id).subscribe(r => {
        this.fullPhoto = r['photo'];
      });
    }
  }

  onImageLoad($event) {
    this.loading = false;
  }
  // _handleSwipe(event) {
  //   if (event.detail.direction === 'left') {
  //     this.nextPhoto();
  //   } else {
  //     this.previousPhoto();
  //   }
  // }
  getPhotoUrl() {
    return this.photo ? FlickrService.getPhotoUrl(this.photo, 'b') : '';
  }
  addToCart(buyType: BuyType) {
    this.buy.emit({
      photo: this.photo,
      url: this.getPhotoUrl(),
      buy: buyType
    })
  }

  viewOnFlickr() {
    var urls = this.photo.urls.url;
    var photopage;
    for (var i = 0; i < urls.length; i++) {
      var url = urls[i];
      if (url.type === 'photopage') {
        photopage = url._content;
        break;
      }
    }
    if (photopage) {
      window.open(photopage);
    }
  }
}
