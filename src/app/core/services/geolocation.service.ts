import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class GeolocationService {
    private geocoder = new google.maps.Geocoder();

    getCoordinates(address: string) {
        return this.geocoder.geocode({
            address,
        });
    }

    geocode(coordinates: google.maps.LatLngLiteral) {
        return this.geocoder.geocode({
            location: coordinates,
        });
    }

    getCurrentPosition(callback: (position: GeolocationPosition) => void) {
        return navigator.geolocation.getCurrentPosition(callback);
    }
}
