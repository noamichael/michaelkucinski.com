import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoLoaderComponent } from './photo-loader.component';

describe('PhotoLoaderComponent', () => {
  let component: PhotoLoaderComponent;
  let fixture: ComponentFixture<PhotoLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
