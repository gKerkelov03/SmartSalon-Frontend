import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { blankProfilePictureUrl } from '../../../../core/constants/urls';
import { CurrentUserService } from '../../../../core/services/current-user.service';
import { User } from '../../models/user.model';

@Component({
    selector: 'app-profile-header',
    templateUrl: './profile-header.component.html',
    styleUrls: ['./profile-header.component.scss'],
})
export class ProfileHeaderComponent implements OnInit {
    userToDisplay!: User;
    constructor(private currentUserService: CurrentUserService) {}

    ngOnInit(): void {
        this.currentUserService.currentUserObservable
            .pipe(take(1))
            .subscribe((user: User | null) => {
                if (user?.profilePictureUrl === null) {
                    user.profilePictureUrl = blankProfilePictureUrl;
                }

                this.userToDisplay = user!;
            });
    }
}
