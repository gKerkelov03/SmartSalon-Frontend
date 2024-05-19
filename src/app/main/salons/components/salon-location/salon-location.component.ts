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
    googleMapsLocation!: string;
    @Input()
    lat!: number;
    @Input()
    lngt!: number;
    userLocation: google.maps.LatLngLiteral = {
        lat: 42.649439,
        lng: 23.344503,
    };
    zoom: number = mapZoomLevelConstants.city;
    mapId = mapId;
    mapOptions: google.maps.MapOptions = {
        mapTypeControl: false,
    };

    constructor(private geolocation: GeolocationService) {}

    ngOnInit(): void {}

    private getUserLocationInfo(): void {
        this.geolocation.getCurrentPosition(async ({ coords }) => {
            this.userLocation = {
                lat: coords.latitude,
                lng: coords.longitude,
            };
        });
    }
}
