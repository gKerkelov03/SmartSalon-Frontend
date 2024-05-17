import { Component, Input } from '@angular/core';
import { blankProfilePictureUrl } from '../../../../core/constants/urls';

@Component({
    selector: 'app-salon-header',
    templateUrl: './salon-header.component.html',
    styleUrl: './salon-header.component.scss',
})
export class SalonHeaderComponent {
    @Input()
    name!: string;
    @Input()
    profilePictureUrl!: string | null;
    blankProfilePictureUrl = blankProfilePictureUrl;

    constructor() {}

    ngOnInit(): void {}
}
