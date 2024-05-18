import { Component, Input } from '@angular/core';
import { blankProfilePictureUrl } from '../../../../core/constants/urls';

@Component({
    selector: 'app-salon-main-picture',
    templateUrl: './salon-main-picture.component.html',
    styleUrl: './salon-main-picture.component.scss',
})
export class SalonMainPictureComponent {
    @Input()
    profilePictureUrl!: string | null;
    blankProfilePictureUrl = blankProfilePictureUrl;
}
