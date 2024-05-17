import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalonHeaderComponent } from './salon-header.component';

describe('SalonHeaderComponent', () => {
    let component: SalonHeaderComponent;
    let fixture: ComponentFixture<SalonHeaderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SalonHeaderComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(SalonHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
