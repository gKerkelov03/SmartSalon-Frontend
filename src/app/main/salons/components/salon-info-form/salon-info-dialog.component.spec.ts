import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalonInfoDialogComponent } from './salon-info-dialog.component';

describe('SalonInfoDialogComponent', () => {
    let component: SalonInfoDialogComponent;
    let fixture: ComponentFixture<SalonInfoDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SalonInfoDialogComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(SalonInfoDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
