// import { Component, OnInit, Injectable } from '@angular/core';
// import { ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Resolve } from '@angular/router'

// import { FlickrService, FlickrPhoto, FlickrResponse } from '../flickr/flickr.service';
// import { PhotoManagerService } from './photo-manager/photo-manager.service';

// @Component({
//   selector: 'mk-gallery',
//   templateUrl: './gallery.component.html',
//   styleUrls: ['./gallery.component.css']
// })
// export class GalleryComponent implements OnInit {

//   constructor(
//     private photoManagerService: PhotoManagerService,
//     private route: ActivatedRoute,
//     private router: Router
//   ) { }

//   ngOnInit() {
//     this.route.data.subscribe(data => {
//       this.photoManagerService.initialize(data.photosResponse);
//     });
//   }

// }

// @Injectable()
// export class PhotosResolver implements Resolve<FlickrResponse> {

//   constructor(
//     private flickrService: FlickrService
//   ) { }


//   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//     const params = route.params;
//     return this.flickrService.getPhotos(
//       params.page,
//       36,
//       params.text,
//       params.tags
//     );
//   }

// }