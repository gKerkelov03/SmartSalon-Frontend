import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileHeaderSectionComponent } from './profile-header-section.component';

describe('ProfileHeaderSectionComponent', () => {
  let component: ProfileHeaderSectionComponent;
  let fixture: ComponentFixture<ProfileHeaderSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileHeaderSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileHeaderSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
