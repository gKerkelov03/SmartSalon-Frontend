import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeCredentialComponent } from './change-credential.component';

describe('ChangeCredentialComponent', () => {
  let component: ChangeCredentialComponent;
  let fixture: ComponentFixture<ChangeCredentialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeCredentialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeCredentialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
