import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSalonDescriptionDialogComponent } from './edit-salon-description-dialog.component';

describe('EditSalonDescriptionDialogComponent', () => {
  let component: EditSalonDescriptionDialogComponent;
  let fixture: ComponentFixture<EditSalonDescriptionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditSalonDescriptionDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditSalonDescriptionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
