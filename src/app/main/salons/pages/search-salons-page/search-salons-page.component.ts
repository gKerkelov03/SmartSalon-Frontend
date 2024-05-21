import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { mapZoomLevelConstants } from '../../../../core/constants/googleMaps';
import { GeolocationService } from '../../../../core/services/geolocation.service';
import { Salon } from '../../models/salon.model';
import { SalonsService } from '../../services/salons.service';

@Component({
    selector: 'app-search-salons-page',
    templateUrl: './search-salons-page.component.html',
    styleUrl: './search-salons-page.component.scss',
})
export class SearchSalonsPageComponent implements OnInit {
    cityName: string = 'Sofia';
    countryName: string = 'Bulgaria';
    mapZoomLevel: number = mapZoomLevelConstants.city;
    userLocation: google.maps.LatLngLiteral = {
        lat: 42.698334,
        lng: 23.319941,
    };

    salons: Salon[] = [];

    constructor(
        private salonsService: SalonsService,
        private geolocation: GeolocationService,
    ) {}

    ngOnInit(): void {
        this.fetchSalons();
    }

    fetchSalons(): void {
        this.salonsService
            .getAll('bulgaria')
            .subscribe((salons: Salon[]) => (this.salons = salons));
    }

    private getUserLocationInfo(): Observable<void> {
        const subject = new Subject<void>();

        this.geolocation.getCurrentPosition(async ({ coords }) => {
            this.userLocation = {
                lat: coords.latitude,
                lng: coords.longitude,
            };

            this.geolocation
                .geocode(this.userLocation)
                .subscribe((response: google.maps.GeocoderResponse) => {
                    const result: google.maps.GeocoderResult =
                        response.results[0];

                    this.countryName = result.address_components.find(
                        (result) => result.types.includes('country'),
                    )!.long_name;

                    this.mapZoomLevel = mapZoomLevelConstants.city;
                    subject.next();
                });
        });

        return subject;
    }
}
