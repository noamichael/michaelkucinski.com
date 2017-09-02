import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Resolve } from '@angular/router';

import { FlickrService, FlickrPhoto, FlickrResponse } from '../../flickr/flickr.service';


@Component({
  selector: 'mk-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {

  @Input()
  photos: FlickrPhoto[]
  @Output()
  photoClick = new EventEmitter<{ photo: FlickrPhoto }>()

  constructor(
    private flickrService: FlickrService,
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit() {

  }

  getPhotoUrl(photo: FlickrPhoto) {
    return FlickrService.getPhotoUrl(photo);
  }

  getPhotoListStyle(photo: FlickrPhoto) {
    return this.domSanitizer.bypassSecurityTrustStyle(FlickrService.getPhotoListStyle(photo));
  }

  selectPhoto(photo: FlickrPhoto) {
    this.photoClick.emit({ photo });
  }

  onImageLoad(photo: FlickrPhoto){
    photo['loaded'] = true;
  }

}