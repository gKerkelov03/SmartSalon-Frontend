import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalonCurrenciesComponent } from './salon-currencies.component';

describe('SalonCurrenciesComponent', () => {
    let component: SalonCurrenciesComponent;
    let fixture: ComponentFixture<SalonCurrenciesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SalonCurrenciesComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(SalonCurrenciesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
