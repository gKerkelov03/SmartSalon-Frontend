import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalonTeamComponent } from './salon-team.component';

describe('SalonTeamComponent', () => {
  let component: SalonTeamComponent;
  let fixture: ComponentFixture<SalonTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalonTeamComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalonTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
