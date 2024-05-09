import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalonsSearchBarComponent } from './salons-search-bar.component';

describe('SalonsSearchBarComponent', () => {
  let component: SalonsSearchBarComponent;
  let fixture: ComponentFixture<SalonsSearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalonsSearchBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalonsSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
