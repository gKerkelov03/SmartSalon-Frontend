import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalonDetailsPageComponent } from './salon-details-page.component';

describe('SalonDetailsPageComponent', () => {
    let component: SalonDetailsPageComponent;
    let fixture: ComponentFixture<SalonDetailsPageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SalonDetailsPageComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(SalonDetailsPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
