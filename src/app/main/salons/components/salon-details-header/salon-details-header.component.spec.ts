import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalonDetailsHeaderComponent } from './salon-details-header.component';

describe('SalonDetailsHeaderComponent', () => {
    let component: SalonDetailsHeaderComponent;
    let fixture: ComponentFixture<SalonDetailsHeaderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SalonDetailsHeaderComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(SalonDetailsHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
