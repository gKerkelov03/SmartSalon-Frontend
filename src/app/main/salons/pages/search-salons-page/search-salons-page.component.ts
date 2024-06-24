import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { mapZoomLevelConstants } from '../../../../core/constants/googleMaps';
import { blankProfilePictureUrl } from '../../../../core/constants/urls';
import { GeolocationService } from '../../../../core/services/geolocation.service';
import { isValidUrl } from '../../../../core/utils/is-valid-url';
import { SalonInfoDialogComponent } from '../../components/salon-info-form/salon-info-dialog.component';
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
    userLocation!: google.maps.LatLngLiteral;
    salons: Salon[] = [];
    isValidUrl = isValidUrl;
    blankProfilePictureUrl = blankProfilePictureUrl;

    constructor(
        private salonsService: SalonsService,
        private geolocation: GeolocationService,
        private dialog: MatDialog,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.getUserLocationInfo();
        this.fetchSalons();
    }

    fetchSalons(): void {
        this.salonsService
            .getAll('bulgaria')
            .subscribe(async (salons: Salon[]) => {
                this.salons =
                    await this.sortSalonsBasedOnDistanceFromUserLocation(
                        salons,
                    );
            });
    }

    async sortSalonsBasedOnDistanceFromUserLocation(
        salons: Salon[],
    ): Promise<Salon[]> {
        const distancesPromises = salons.map((salon) =>
            this.calculateDistance(this.userLocation, {
                lat: Number(salon.latitude),
                lng: Number(salon.longitude),
            }),
        );

        const distances = await Promise.all(distancesPromises);
        const sorted = distances
            .map((distance, index) => {
                return { distance, salon: salons[index] };
            })
            .sort((a, b) => a.distance - b.distance)
            .map((salonAndDistanceObj) => salonAndDistanceObj.salon);

        return sorted;
    }

    showMoreInfoAboutSalon(salon: Salon) {
        const salonHasImagesAndSpecialties =
            salon?.images.length && salon.specialties.length;

        if (salonHasImagesAndSpecialties) {
            this.dialog.open(SalonInfoDialogComponent, {
                width: '50vw',
                autoFocus: false,
                panelClass: 'round-without-padding',
                data: salon,
                enterAnimationDuration: '300ms',
            });
        } else {
            this.openSalonDetails(salon);
        }
    }

    openSalonDetails(salon: Salon) {
        this.router.navigate([`main/salons/${salon?.id}`]);
    }

    calculateDistance(
        origin: google.maps.LatLngLiteral,
        destination: google.maps.LatLngLiteral,
    ): Promise<number> {
        return new Promise((resolve, reject) => {
            const service = new google.maps.DistanceMatrixService();

            service.getDistanceMatrix(
                {
                    origins: [new google.maps.LatLng(origin.lat, origin.lng)],
                    destinations: [
                        new google.maps.LatLng(
                            destination.lat,
                            destination.lng,
                        ),
                    ],
                    travelMode: google.maps.TravelMode.WALKING,
                },
                (response, status) => {
                    if (status === google.maps.DistanceMatrixStatus.OK) {
                        const results = response!.rows[0].elements;
                        const distance = results[0].distance.value;

                        resolve(distance);
                    } else {
                        reject(status);
                    }
                },
            );
        });
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
