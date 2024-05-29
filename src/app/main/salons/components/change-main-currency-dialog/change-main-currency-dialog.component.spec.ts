import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeMainCurrencyDialogComponent } from './change-main-currency-dialog.component';

describe('ChangeMainCurrencyDialogComponent', () => {
  let component: ChangeMainCurrencyDialogComponent;
  let fixture: ComponentFixture<ChangeMainCurrencyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChangeMainCurrencyDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChangeMainCurrencyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
