import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoreInfoAboutBookingComponent } from './more-info-about-booking.component';

describe('MoreInfoAboutBookingComponent', () => {
    let component: MoreInfoAboutBookingComponent;
    let fixture: ComponentFixture<MoreInfoAboutBookingComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MoreInfoAboutBookingComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(MoreInfoAboutBookingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
