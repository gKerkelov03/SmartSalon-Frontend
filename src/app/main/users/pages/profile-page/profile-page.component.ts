import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-profile-page',
    templateUrl: './profile-page.component.html',
    styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent implements OnInit {
    ngOnInit(): void {
        console.log('profile page created');
    }
}
