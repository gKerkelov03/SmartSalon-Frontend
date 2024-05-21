import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { blankProfilePictureUrl } from '../../../../core/constants/urls';
import { CurrentUserService } from '../../../../core/services/current-user.service';
import { isValidUrl } from '../../../../core/utils/is-valid-url';
import { User } from '../../models/user.model';

@Component({
    selector: 'app-profile-header',
    templateUrl: './profile-header.component.html',
    styleUrls: ['./profile-header.component.scss'],
})
export class ProfileHeaderComponent implements OnInit {
    user!: User;
    constructor(private currentUser: CurrentUserService) {}

    ngOnInit(): void {
        this.fetchUser();
    }

    setBlankProfilePictureIfNeeded(): void {
        if (!isValidUrl(this.user.profilePictureUrl)) {
            this.user.profilePictureUrl = blankProfilePictureUrl;
        }
    }

    fetchUser(): void {
        this.currentUser.currentUserObservable
            .pipe(take(1))
            .subscribe((user: User | null) => {
                if (user?.profilePictureUrl === null) {
                    user.profilePictureUrl = blankProfilePictureUrl;
                }

                this.user = user!;
                this.setBlankProfilePictureIfNeeded();
            });
    }
}
