import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { blankProfilePictureUrl } from '../../../../core/constants/urls';
import { isValidUrl } from '../../../../core/utils/is-valid-url';
import { Salon } from '../../models/salon.model';

@Component({
    selector: 'app-salon-card',
    templateUrl: './salon-card.component.html',
    styleUrl: './salon-card.component.scss',
})
export class SalonCardComponent implements OnInit {
    @Input()
    salon!: Salon;

    constructor(private router: Router) {}

    ngOnInit(): void {
        this.setBlankSalonProfilePictureIfNeeded();
    }

    setBlankSalonProfilePictureIfNeeded(): void {
        if (!isValidUrl(this.salon.profilePictureUrl)) {
            this.salon.profilePictureUrl = blankProfilePictureUrl;
        }
    }

    openSalon(salonId: string) {
        this.router.navigate([`main/salons/${salonId}`]);
    }

    openSalonSchedule(salonId: string) {
        this.router.navigate([`main/bookings/salon-schedule/${salonId}`]);
    }
}
