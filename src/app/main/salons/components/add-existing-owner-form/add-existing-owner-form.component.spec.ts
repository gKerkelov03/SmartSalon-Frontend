import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExistingOwnerFormComponent } from './add-existing-owner-form.component';

describe('AddExistingOwnerFormComponent', () => {
  let component: AddExistingOwnerFormComponent;
  let fixture: ComponentFixture<AddExistingOwnerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddExistingOwnerFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddExistingOwnerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
