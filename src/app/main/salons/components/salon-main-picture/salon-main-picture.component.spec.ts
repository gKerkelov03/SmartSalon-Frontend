import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalonMainPictureComponent } from './salon-main-picture.component';

describe('SalonMainPictureComponent', () => {
  let component: SalonMainPictureComponent;
  let fixture: ComponentFixture<SalonMainPictureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalonMainPictureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalonMainPictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
