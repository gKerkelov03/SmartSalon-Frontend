import { Component } from '@angular/core';
import { blankProfilePictureUrl } from '../../../../core/constants/urls';
import { Worker } from '../../../users/models/worker.model';

@Component({
    selector: 'app-salon-team',
    templateUrl: './salon-team.component.html',
    styleUrl: './salon-team.component.scss',
})
export class SalonTeamComponent {
    // @Input()
    team: Worker[] = [
        {
            firstName: 'gosho',
            lastName: 'kerkelov',
            emailConfirmed: true,
            salons: [],
            nickname: 'Gosho',
            jobTitles: [],
            email: 'gkerkelov03@abv.bg',
            id: 'guid',
            phoneNumber: 'asdfsd',
            profilePictureUrl: blankProfilePictureUrl,
            roles: [],
        },
        {
            firstName: 'gosho',
            lastName: 'kerkelov',
            emailConfirmed: true,
            salons: [],
            nickname: 'Pesho',
            jobTitles: [],
            email: 'gkerkelov03@abv.bg',
            id: 'guid',
            phoneNumber: 'asdfsd',
            profilePictureUrl: blankProfilePictureUrl,
            roles: [],
        },
        {
            firstName: 'gosho',
            lastName: 'kerkelov',
            emailConfirmed: true,
            salons: [],
            nickname: 'Stamo',
            jobTitles: [],
            email: 'gkerkelov03@abv.bg',
            id: 'guid',
            phoneNumber: 'asdfsd',
            profilePictureUrl: blankProfilePictureUrl,
            roles: [],
        },
    ];
}
