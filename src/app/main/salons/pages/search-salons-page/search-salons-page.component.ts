import { Component, OnInit } from '@angular/core';
import { Observable, Subject, switchMap } from 'rxjs';
import { mapZoomLevelConstants } from '../../../../core/constants/googleMaps';
import { GeolocationService } from '../../../../core/services/geolocation.service';
import { SalonWithCoordinates } from '../../models/salon-with-coordinates.model';
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
    mapZoomLevel: number = mapZoomLevelConstants.country;
    userLocation: google.maps.LatLngLiteral = {
        lat: 42.698334,
        lng: 23.319941,
    };

    salonsWithCoordinates: SalonWithCoordinates[] = [];

    constructor(
        private salonsService: SalonsService,
        private geolocation: GeolocationService,
    ) {}

    ngOnInit(): void {
        this.getUserLocationInfo()
            .pipe(switchMap(() => this.salonsService.getAll()))
            .subscribe(
                async (salons: Salon[]) =>
                    await Promise.all(
                        salons.map(async (salon) => {
                            const geocoderResponse =
                                await this.geolocation.getCoordinates(
                                    salon.googleMapsLocation,
                                );
                            console.log(geocoderResponse.results);
                            return {
                                ...salon,
                                coordinates: geocoderResponse,
                            };
                        }),
                    ),
            );
    }

    private getUserLocationInfo(): Observable<void> {
        const subject = new Subject<void>();

        this.geolocation.getCurrentPosition(async ({ coords }) => {
            this.userLocation = {
                lat: coords.latitude,
                lng: coords.longitude,
            };

            const result: google.maps.GeocoderResult = (
                await this.geolocation.geocode(this.userLocation)
            ).results[0];

            this.countryName = result.address_components.find((result) =>
                result.types.includes('country'),
            )!.long_name;

            this.mapZoomLevel = mapZoomLevelConstants.city;
            subject.next();
        });

        return subject;
    }
}
