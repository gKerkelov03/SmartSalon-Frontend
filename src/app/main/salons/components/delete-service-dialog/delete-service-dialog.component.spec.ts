import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteServiceDialogComponent } from './delete-service-dialog.component';

describe('DeleteServiceDialogComponent', () => {
  let component: DeleteServiceDialogComponent;
  let fixture: ComponentFixture<DeleteServiceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteServiceDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteServiceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
