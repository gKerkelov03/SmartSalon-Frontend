import { Component, Input } from '@angular/core';
import { blankProfilePictureUrl } from '../../../../core/constants/urls';
import { CurrentUserService } from '../../../../core/services/current-user.service';
import { Salon } from '../../models/salon.model';
import { SalonsService } from '../../services/salons.service';

@Component({
    selector: 'app-salon-main-picture',
    templateUrl: './salon-main-picture.component.html',
    styleUrl: './salon-main-picture.component.scss',
})
export class SalonMainPictureComponent {
    @Input()
    salon!: Salon;
    blankProfilePictureUrl = blankProfilePictureUrl;

    constructor(
        public currentUser: CurrentUserService,
        private salonsService: SalonsService,
    ) {}

    newPictureUploaded(newPictureUrl: string) {
        this.salonsService
            .update(this.salon.id, {
                ...this.salon,
                profilePictureUrl: newPictureUrl,
            })
            .subscribe(() => (this.salon.profilePictureUrl = newPictureUrl));
    }
}
