import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalonSpecialtyDialogComponent } from './salon-specialty-dialog.component';

describe('SalonSpecialtyDialogComponent', () => {
  let component: SalonSpecialtyDialogComponent;
  let fixture: ComponentFixture<SalonSpecialtyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalonSpecialtyDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalonSpecialtyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
