import { Component, Input, OnInit } from '@angular/core';
import {
    mapId,
    mapZoomLevelConstants,
} from '../../../../core/constants/googleMaps';
import { GeolocationService } from '../../../../core/services/geolocation.service';

@Component({
    selector: 'app-salon-location',
    templateUrl: './salon-location.component.html',
    styleUrl: './salon-location.component.scss',
})
export class SalonLocationComponent implements OnInit {
    @Input()
    location!: string;
    userLocation!: google.maps.LatLngLiteral;
    zoom: number = mapZoomLevelConstants.city;
    mapId = mapId;
    mapOptions: google.maps.MapOptions = {
        mapTypeControl: false,
    };

    constructor(private geolocation: GeolocationService) {}

    ngOnInit(): void {
        this.getUserLocationInfo();
    }

    private getUserLocationInfo(): void {
        this.geolocation.getCurrentPosition(async ({ coords }) => {
            this.userLocation = {
                lat: coords.latitude,
                lng: coords.longitude,
            };
        });
    }

    moveMap(event: google.maps.MapMouseEvent) {
        this.userLocation = event.latLng!.toJSON();
    }
}
