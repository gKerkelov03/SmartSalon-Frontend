import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalonOwnersComponent } from './salon-owners.component';

describe('SalonOwnersComponent', () => {
  let component: SalonOwnersComponent;
  let fixture: ComponentFixture<SalonOwnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalonOwnersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalonOwnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
