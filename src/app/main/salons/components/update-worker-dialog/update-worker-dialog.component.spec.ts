import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateWorkerDialogComponent } from './update-worker-dialog.component';

describe('UpdateWorkerDialogComponent', () => {
  let component: UpdateWorkerDialogComponent;
  let fixture: ComponentFixture<UpdateWorkerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateWorkerDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateWorkerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
