import { Component, OnInit, Input } from '@angular/core';

import { FlickrPhoto } from '../../flickr/flickr-photo';

@Component({
  selector: 'mk-photo-loader',
  templateUrl: './photo-loader.component.html',
  styleUrls: ['./photo-loader.component.css']
})
export class PhotoLoaderComponent implements OnInit {

  @Input()
  photo: FlickrPhoto
  @Input()
  odd: boolean
  @Input()
  url

  constructor() { }

  ngOnInit() {
  }

  onImageLoad(photo: FlickrPhoto) {
    photo['loaded'] = true;
  }

}
