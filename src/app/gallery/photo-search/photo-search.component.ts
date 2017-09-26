import { Component, OnInit, OnDestroy, Injectable, ViewChild, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Resolve } from '@angular/router';
import 'rxjs/add/operator/debounceTime';

import { FlickrPhoto, FlickrResponse } from '../../flickr/flickr.service';
import { PhotoManagerService, shallowClone } from '../photo-manager/photo-manager.service';

@Component({
  selector: 'mk-photo-search',
  templateUrl: './photo-search.component.html',
  styleUrls: ['./photo-search.component.css']
})
export class PhotoSearchComponent implements OnInit, OnDestroy, AfterViewInit {

  private queryParams: any;

  filter = {}
  text: string
  categories = [
    { label: 'Landscapes', value: 'landscape' },
    { label: 'Portraits', value: 'portrait' },
    { label: 'Abstract', value: 'abstract' },
    { label: 'Sunrise', value: 'sunrise' },
    { label: 'Sunset', value: 'sunset' },
    { label: "Michael's Favorites", value: 'for-sale' }
  ];
  photos: FlickrPhoto[]

  @ViewChild('searchInput')
  searchInput: FormControl

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

  ngAfterViewInit() {
    this.searchInput.valueChanges.debounceTime(500).subscribe(($event) => {
      this.onFilterChange($event);
    });
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
  canGoNext() {
    return this.photoManagerService.canGoNext();
  }
  canGoPrevious() {
    return this.photoManagerService.canGoPrevious();
  }

  onPhotoClick($event: { photo: FlickrPhoto }) {
    this.router.navigate(['./', $event.photo.id], { relativeTo: this.route });
  }

  onFilterChange($event) {
    setTimeout(() => {
      const tags = [];
      for (let tagName in this.filter) {
        if (this.filter[tagName]) {
          tags.push(tagName);
        }
      }

      this.navigateByParams(this.text, tags);
    });
  }

  navigateByParams(text: string, tags: string[]) {
    const query: { tags: string[], text?: string } = { tags };
    if (text) {
      query.text = text;
    }
    return this.router.navigate(['./', query]);
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

