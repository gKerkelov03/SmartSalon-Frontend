import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { CurrentUserService } from '../../../../core/services/current-user.service';

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
            .subscribe((currentUser) => {
                if (currentUser === null) {
                    return;
                }

                this.firstName = currentUser.firstName;
                this.lastName = currentUser.lastName;
                this.email = currentUser.email;
                this.phoneNumber = currentUser.phoneNumber;
                this.profilePictureUrl = currentUser.profilePictureUrl;
            });
    }
}
