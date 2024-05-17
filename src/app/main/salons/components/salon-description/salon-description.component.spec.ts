import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalonDescriptionComponent } from './salon-description.component';

describe('SalonDescriptionComponent', () => {
  let component: SalonDescriptionComponent;
  let fixture: ComponentFixture<SalonDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalonDescriptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalonDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
