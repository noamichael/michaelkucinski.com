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
  @Output()
  next: EventEmitter<PaginationEvent> = new EventEmitter()
  @Output()
  previous: EventEmitter<PaginationEvent> = new EventEmitter()
  @Output()
  back: EventEmitter<{}> = new EventEmitter()


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

  @HostListener('keydown')
  onKeydown(event: KeyboardEvent) {
    switch (event.key) {
      case "ArrowLeft":
        this.previousPhoto();
        break;
      case "ArrowRight":
        this.nextPhoto();
        break;
    }

  }
  onImageMousemove(e) {
    e.preventDefault();
  }
  onImageLoad($event) {
    this.loading = false;
  }
  previousPhoto() {
    this.previous.emit({ photo: this.photo });
  }
  nextPhoto() {
    this.next.emit({ photo: this.photo });
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
  goBack() {
    this.back.emit({});
  }
  handleFlickrResponse(event) {

  }

  viewOnFlickr() {
    var urls = this.photo.url;
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
