import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalonJobTitlesComponent } from './salon-job-titles.component';

describe('SalonJobTitlesComponent', () => {
  let component: SalonJobTitlesComponent;
  let fixture: ComponentFixture<SalonJobTitlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalonJobTitlesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalonJobTitlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
