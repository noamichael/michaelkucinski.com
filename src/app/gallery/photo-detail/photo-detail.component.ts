import { Component, OnInit, Injectable, HostListener } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Resolve } from '@angular/router';
import 'rxjs/add/operator/map';

import { FlickrService, FlickrPhoto, FlickrResponse } from '../../flickr/flickr.service';
import { PhotoManagerService } from '../photo-manager/photo-manager.service';

@Component({
  selector: 'mk-photo-detail',
  templateUrl: './photo-detail.component.html',
  styleUrls: ['./photo-detail.component.css']
})
export class PhotoDetailComponent implements OnInit {

  photo: FlickrPhoto

  constructor(
    private photoManagerService: PhotoManagerService,
    private route: ActivatedRoute,
    private router: Router
  ) { }



  ngOnInit() {
    this.route.data.subscribe(r => {
      this.photo = r.photo;
    });
  }
  @HostListener('keydown')
  onKeydown(event: KeyboardEvent) {
    switch (event.key) {
      case "ArrowLeft":
        //this.previousPhoto();
        break;
      case "ArrowRight":
        //this.nextPhoto();
        break;
    }
  }

  hasPhotos(){
    return this.photoManagerService.hasPhotos();
  }

  next(){
    this.photoManagerService.navigateNext(this.photo); 
  }

  previous(){
    this.photoManagerService.navigatePrevious(this.photo)
  }

  back() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

}


@Injectable()
export class PhotoResolver implements Resolve<FlickrResponse> {

  constructor(
    private flickrService: FlickrService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!route.params.id) {
      throw new Error("missing photo id");
    }
    return this.flickrService.getPhoto(route.params.id).map(r => r['photo']);
  }

}
