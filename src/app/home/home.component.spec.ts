import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MkHomeComponent } from './home.component';

describe('MkHomeComponent', () => {
  let component: MkHomeComponent;
  let fixture: ComponentFixture<MkHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MkHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MkHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
