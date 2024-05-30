import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { blankProfilePictureUrl } from '../../../../core/constants/urls';
import { CurrentUserService } from '../../../../core/services/current-user.service';
import { isValidUrl } from '../../../../core/utils/is-valid-url';
import { User } from '../../models/user.model';
import { UsersService } from '../../services/users.service';

@Component({
    selector: 'app-profile-header',
    templateUrl: './profile-header.component.html',
    styleUrls: ['./profile-header.component.scss'],
})
export class ProfileHeaderComponent implements OnInit {
    user!: User;
    constructor(
        private currentUser: CurrentUserService,
        private usersService: UsersService,
        private snackBar: MatSnackBar,
    ) {}

    ngOnInit(): void {
        this.fetchUser();
    }

    fetchUser(): void {
        this.currentUser.currentUserObservable.subscribe(
            (user: User | null) => {
                if (!isValidUrl(user?.profilePictureUrl)) {
                    user!.profilePictureUrl = blankProfilePictureUrl;
                }

                this.user = user!;
                return;
            },
        );
    }

    changeProfilePicture(newProfilePictureUrl: string): void {
        var updateObserver = {
            next: () => {
                this.user.profilePictureUrl = newProfilePictureUrl;
                this.currentUser.setCurrentUser(this.user);
            },
            error: (httpError: HttpErrorResponse) =>
                this.snackBar.open(httpError.error.message, 'Close'),
        };

        this.usersService
            .update(this.currentUser.currentUser!.id, {
                ...this.user,
                profilePictureUrl: newProfilePictureUrl,
            })
            .subscribe(updateObserver);
    }
}
