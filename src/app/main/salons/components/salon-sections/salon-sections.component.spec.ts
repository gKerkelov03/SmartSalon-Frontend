import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalonSectionsComponent } from './salon-sections.component';

describe('SalonSectionsComponent', () => {
  let component: SalonSectionsComponent;
  let fixture: ComponentFixture<SalonSectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalonSectionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalonSectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
