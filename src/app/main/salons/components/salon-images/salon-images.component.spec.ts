import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalonImagesComponent } from './salon-images.component';

describe('SalonImagesComponent', () => {
  let component: SalonImagesComponent;
  let fixture: ComponentFixture<SalonImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalonImagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalonImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
