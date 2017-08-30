import { Component, OnInit, Input } from '@angular/core';
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

  constructor(
    private flickrService: FlickrService,
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit() {

  }

  getPhotoListStyle(photo: FlickrPhoto){
    return this.domSanitizer.bypassSecurityTrustStyle(FlickrService.getPhotoListStyle(photo));
  }

}