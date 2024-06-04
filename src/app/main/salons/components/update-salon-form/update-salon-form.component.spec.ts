import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSalonFormComponent } from './update-salon-form.component';

describe('UpdateSalonFormComponent', () => {
  let component: UpdateSalonFormComponent;
  let fixture: ComponentFixture<UpdateSalonFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateSalonFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateSalonFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
