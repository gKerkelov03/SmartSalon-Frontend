import { Component, OnInit } from '@angular/core';
import { blankProfilePictureUrl } from '../core/constants/urls';
import { CurrentUserService } from '../core/services/current-user.service';
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
        this.profilePictureUrl =
            this.currentUser.currentUser?.profilePictureUrl ??
            blankProfilePictureUrl;
    }
}
