import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalonSpecialtiesComponent } from './salon-specialties.component';

describe('SalonSpecialtiesComponent', () => {
    let component: SalonSpecialtiesComponent;
    let fixture: ComponentFixture<SalonSpecialtiesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SalonSpecialtiesComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(SalonSpecialtiesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
