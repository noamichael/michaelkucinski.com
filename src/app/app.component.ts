import { Component, OnInit } from '@angular/core';
import { Router, NavigationCancel, NavigationEnd, NavigationError, NavigationStart } from '@angular/router';

@Component({
  selector: 'mk-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loading: boolean
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loading = true;
      } else if (this.instanceofAny(event, NavigationCancel, NavigationEnd, NavigationError)) {
        this.loading = false;
      }
    });
  }
  instanceofAny(event, ...types: any[]) {
    for (let t of types) {
      if (event instanceof t) {
        return true;
      }
    }
    return false;
  }
}
