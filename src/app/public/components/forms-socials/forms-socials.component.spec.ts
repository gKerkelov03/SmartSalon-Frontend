import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsSocialsComponent } from './forms-socials.component';

describe('FormsSocialsComponent', () => {
  let component: FormsSocialsComponent;
  let fixture: ComponentFixture<FormsSocialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormsSocialsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsSocialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
