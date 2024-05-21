import { Component, Input, OnInit } from '@angular/core';
import { sidenavItems } from '../../../core/constants/sidenav-items';
import { blankProfilePictureUrl } from '../../../core/constants/urls';
import { isValidUrl } from '../../../core/utils/is-valid-url';

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrl: './sidenav.component.scss',
})
export class SidenavComponent implements OnInit {
    @Input()
    profilePictureUrl?: string;

    ngOnInit(): void {
        if (!isValidUrl(this.profilePictureUrl)) {
            this.profilePictureUrl = blankProfilePictureUrl;
        }
    }

    sidenavItems = sidenavItems;
}
