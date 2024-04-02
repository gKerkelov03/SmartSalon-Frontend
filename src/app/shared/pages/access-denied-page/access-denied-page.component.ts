import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-access-denied-page',
    templateUrl: './access-denied-page.component.html',
    styleUrls: ['./access-denied-page.component.scss'],
})
export class AccessDeniedPageComponent {
    constructor(private router: Router) {}

    goToTheLandingPage() {
        this.router.navigate(['public']);
    }
}
