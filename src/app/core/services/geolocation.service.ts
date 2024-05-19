import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class GeolocationService {
    private geocoder = new google.maps.Geocoder();

    getCoordinates(address: string): Observable<google.maps.GeocoderResponse> {
        return from(
            this.geocoder.geocode({
                address,
            }),
        );
    }

    geocode(
        coordinates: google.maps.LatLngLiteral,
    ): Observable<google.maps.GeocoderResponse> {
        return from(
            this.geocoder.geocode({
                location: coordinates,
            }),
        );
    }

    getCurrentPosition(callback: (position: GeolocationPosition) => void) {
        return navigator.geolocation.getCurrentPosition(callback);
    }
}
