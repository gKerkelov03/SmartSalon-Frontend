import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalonsMapComponent } from './salons-map.component';

describe('SalonsMapComponent', () => {
  let component: SalonsMapComponent;
  let fixture: ComponentFixture<SalonsMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalonsMapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalonsMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
