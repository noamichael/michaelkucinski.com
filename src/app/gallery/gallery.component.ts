import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FlickrService, FlickrPhoto, FlickrResponse } from '../flickr/flickr.service';

@Component({
  selector: 'mk-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  constructor(
    private flickrService: FlickrService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

  }

}

