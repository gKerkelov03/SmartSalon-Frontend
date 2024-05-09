import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalonInfoFormComponent } from './salon-info-form.component';

describe('SalonInfoFormComponent', () => {
  let component: SalonInfoFormComponent;
  let fixture: ComponentFixture<SalonInfoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalonInfoFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalonInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
