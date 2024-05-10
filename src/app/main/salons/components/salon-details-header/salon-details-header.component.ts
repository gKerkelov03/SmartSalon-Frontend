import { Component, Input } from '@angular/core';
import { blankProfilePictureUrl } from '../../../../core/constants/urls';
import { Salon } from '../../models/salon.model';

@Component({
    selector: 'app-salon-details-header',
    templateUrl: './salon-details-header.component.html',
    styleUrl: './salon-details-header.component.scss',
})
export class SalonDetailsHeaderComponent {
    @Input()
    salonToDisplay!: Salon;
    blankProfilePictureUrl = blankProfilePictureUrl;
    constructor() {}

    ngOnInit(): void {
        console.log(this.salonToDisplay);
    }
}
