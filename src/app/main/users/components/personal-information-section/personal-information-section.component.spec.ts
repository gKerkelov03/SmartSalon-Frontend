import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileChangeDataSectionComponent } from './personal-information-section.component';

describe('ProfileChangeDataSectionComponent', () => {
    let component: ProfileChangeDataSectionComponent;
    let fixture: ComponentFixture<ProfileChangeDataSectionComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ProfileChangeDataSectionComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ProfileChangeDataSectionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
