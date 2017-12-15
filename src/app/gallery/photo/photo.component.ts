import {
  Component, OnInit, OnChanges, Input,
  Output, HostListener, EventEmitter,
  ViewChild, ElementRef
} from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

import { FlickrPhoto, FlickrService } from '../../flickr/flickr.service';

type BuyType = 'FILE' | 'PRINT';
interface PaginationEvent { photo: FlickrPhoto }

export interface BuyEvent extends PaginationEvent {
  buy: BuyType,
  url: string
}

@Component({
  selector: 'mk-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css'],
  animations: [
    trigger('scaleIn', [
      transition(':enter', [
        style({ transform: 'scale(0)' }),
        animate(250, style({ transform: 'scale(1)' }))
      ])
    ])
  ]
})
export class PhotoComponent implements OnInit, OnChanges {

  fullPhoto: FlickrPhoto

  @Input()
  photo: FlickrPhoto

  @Output()
  buy: EventEmitter<BuyEvent> = new EventEmitter()

  @ViewChild('image')
  image: ElementRef

  constructor(
    private flickrService: FlickrService
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes) {
    //TODO: Load full photo details
    if (changes.photo && this.photo) {
      this.flickrService.getPhoto(this.photo.id).subscribe(r => {
        this.fullPhoto = r['photo'];
      });
    }
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
  @HostListener('window:resize')
  onWindowResize() {
    setTimeout(() => {
      if (!this.image) {
        return;
      }
      const img: HTMLImageElement = this.image.nativeElement;
      if (img.naturalWidth > img.naturalHeight) {
      }
      img.style['max-height'] = (window.innerHeight - 256) + 'px';
      img.style['max-width'] = (window.innerWidth) + 'px';
    });
  }
}
