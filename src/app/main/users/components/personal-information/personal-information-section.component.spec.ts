import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalInformation } from './personal-information.component';

describe('PersonalInformationComponent', () => {
    let component: PersonalInformation;
    let fixture: ComponentFixture<PersonalInformation>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PersonalInformation],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PersonalInformation);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
