import { Component, OnInit, OnDestroy, Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Resolve } from '@angular/router';

import { FlickrPhoto, FlickrResponse } from '../../flickr/flickr.service';
import { PhotoManagerService, shallowClone } from '../photo-manager/photo-manager.service';

@Component({
  selector: 'mk-photo-search',
  templateUrl: './photo-search.component.html',
  styleUrls: ['./photo-search.component.css']
})
export class PhotoSearchComponent implements OnInit, OnDestroy {

  private queryParams: any;

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
    private photoManagerService: PhotoManagerService,
    private route: ActivatedRoute,
    private router: Router
  ) { }



  ngOnInit() {
    this.route.data.subscribe(data => {
      this.photos = data.photosResponse.photos.photo;
      setTimeout(() => {
        document.body.scrollTop = 0;
      });
    });
    this.route.params.subscribe(params => {
      this.queryParams = params;
    });
  }


  ngOnDestroy() {

  }

  next() {
    const params = shallowClone(this.queryParams);
    params['page'] = Number(params['page'] || 1) + 1;
    this.router.navigate(['./', params], { relativeTo: this.route })
  }

  previous() {
    const params = shallowClone(this.queryParams);
    params['page'] = Number(params['page'] || 1) - 1;
    this.router.navigate(['./', params], { relativeTo: this.route })
  }

  onPhotoClick($event: { photo: FlickrPhoto }) {
    this.router.navigate(['./', $event.photo.id], { relativeTo: this.route });
  }

  onFilterChange($event) {
    console.log($event);
  }

}

@Injectable()
export class PhotosResolver implements Resolve<FlickrResponse> {

  constructor(
    private photoManagerService: PhotoManagerService
  ) { }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const params = shallowClone(route.params);
    return this.photoManagerService.getPhotos(params);
  }

}

