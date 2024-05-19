import { Component, Renderer2 } from '@angular/core';
import { environment } from '../environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'SmartSalon';
    constructor(private renderer: Renderer2) {}

    ngOnInit(): void {
        this.includeGoogleMapsScripts();
    }

    includeGoogleMapsScripts(): void {
        const script = this.renderer.createElement('script');

        script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsApiKey}`;
        script.defer = true;

        this.renderer.appendChild(document.head, script);
    }
}
