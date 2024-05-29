import { Component, OnInit } from '@angular/core';
import { blankProfilePictureUrl } from '../core/constants/urls';
import { CurrentUserService } from '../core/services/current-user.service';
import { isValidUrl } from '../core/utils/is-valid-url';
import { User } from './users/models/user.model';
@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
    isSidenavExpanded: boolean = false;
    changeIcon: boolean = true;
    profilePictureUrl!: string;

    constructor(public currentUser: CurrentUserService) {}

    ngOnInit(): void {
        this.currentUser.currentUserObservable.subscribe(
            (user: User | null) => {
                if (!user) {
                    return;
                }

                this.profilePictureUrl = isValidUrl(user.profilePictureUrl)
                    ? user.profilePictureUrl
                    : blankProfilePictureUrl;
            },
        );
    }
}
