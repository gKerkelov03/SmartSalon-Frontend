import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { blankProfilePictureUrl } from '../../../../core/constants/urls';
import { CurrentUserService } from '../../../../core/services/current-user.service';
import { User } from '../../models/user.model';

@Component({
    selector: 'app-profile-header-section',
    templateUrl: './profile-header-section.component.html',
    styleUrls: ['./profile-header-section.component.scss'],
})
export class ProfileHeaderSectionComponent implements OnInit {
    firstName!: string;
    lastName!: string;
    email!: string;
    phoneNumber!: string;
    profilePictureUrl!: string;

    constructor(private currentUserService: CurrentUserService) {}

    ngOnInit(): void {
        this.currentUserService.currentUserObservable
            .pipe(take(1))
            .subscribe((user: User | null) => {
                if (user?.profilePictureUrl === null) {
                    user.profilePictureUrl = blankProfilePictureUrl;
                }

                this.firstName = user!.firstName;
                this.lastName = user!.lastName;
                this.email = user!.email;
                this.phoneNumber = user!.phoneNumber;
                this.profilePictureUrl = user!.profilePictureUrl;
            });
    }
}
