import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSpecialtyDialogComponent } from './delete-specialty-dialog.component';

describe('DeleteSpecialtyDialogComponent', () => {
  let component: DeleteSpecialtyDialogComponent;
  let fixture: ComponentFixture<DeleteSpecialtyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteSpecialtyDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteSpecialtyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
