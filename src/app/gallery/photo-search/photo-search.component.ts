import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Resolve } from '@angular/router';

import { FlickrService, FlickrPhoto, FlickrResponse } from '../../flickr/flickr.service';

@Component({
  selector: 'mk-photo-search',
  templateUrl: './photo-search.component.html',
  styleUrls: ['./photo-search.component.css']
})
export class PhotoSearchComponent implements OnInit {

  filter = {}

  categories = [
    { label: 'Landscapes', value: 'landscape' },
    { label: 'Portraits', value: 'portrait' },
    { label: 'Abstract', value: 'abstract' },
    { label: 'Sunrise', value: 'sunrise' },
    { label: 'Sunset', value: 'sunset' },
    { label: "Michael's Favorites", value: 'for-sale' }
  ];

  photos: FlickrPhoto[]

  constructor(
    private flickrService: FlickrService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.data.subscribe(r => {
      this.photos = r.photos.photos;
    });
  }
  onPhotoClick($event: { photo: FlickrPhoto }) {
    this.router.navigate(['./', $event.photo.id], { relativeTo: this.route });
  }

}

@Injectable()
export class PhotosResolver implements Resolve<FlickrResponse> {

  constructor(
    private flickrService: FlickrService
  ) { }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const params = route.params;
    return this.flickrService.getPhotos(
      params.page,
      36,
      params.text,
      params.tags
    );
  }

}
