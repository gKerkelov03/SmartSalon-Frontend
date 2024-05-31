import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExistingWorkerFormComponent } from './add-existing-worker-form.component';

describe('AddExistingWorkerFormComponent', () => {
  let component: AddExistingWorkerFormComponent;
  let fixture: ComponentFixture<AddExistingWorkerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddExistingWorkerFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddExistingWorkerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
