import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, debounceTime, map, startWith } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { blankProfilePictureUrl } from '../../../../core/constants/urls';
import { isValidUrl } from '../../../../core/utils/is-valid-url';
import { Salon } from '../../models/salon.model';

@Component({
    selector: 'app-salons-map',
    templateUrl: './salons-map.component.html',
    styleUrl: './salons-map.component.scss',
})
export class SalonsMapComponent implements OnInit {
    @Input()
    center!: google.maps.LatLngLiteral;
    @Input()
    zoom!: number;
    @Input()
    salons!: Salon[];
    @Output()
    salonSelected: EventEmitter<Salon> = new EventEmitter<Salon>();
    mapId = environment.googleMaps.mapId;
    mapOptions: google.maps.MapOptions = {
        mapTypeControl: false,
        fullscreenControl: false,
    };
    isValidUrl = isValidUrl;
    blankProfilePictureUrl = blankProfilePictureUrl;
    salonsControl = new FormControl('');
    autocompleteOptions!: Observable<Salon[]>;

    constructor() {}

    ngOnInit(): void {
        this.keepTheAutocompleteUpdatedBasedOnTheSearchTerm();
    }

    keepTheAutocompleteUpdatedBasedOnTheSearchTerm(): void {
        this.autocompleteOptions = this.salonsControl.valueChanges.pipe(
            startWith(''),
            debounceTime(300),
            map((value) =>
                this.salons.filter(
                    (salon) =>
                        salon.name
                            .toLowerCase()
                            .includes(value!.toLowerCase()) ||
                        salon.googleMapsLocation
                            .toLowerCase()
                            .includes(value!.toLowerCase()),
                ),
            ),
        );
    }

    mapMarkerClicked(event: google.maps.MapMouseEvent) {
        const salon = this.salons.find(
            (salon) =>
                parseFloat(salon.latitude) === event.latLng?.lat() &&
                parseFloat(salon.longitude) === event.latLng?.lng(),
        )!;

        this.salonSelected.emit(salon);
    }

    getCoordinates(salon: Salon): google.maps.LatLngLiteral {
        return {
            lat: parseFloat(salon.latitude),
            lng: parseFloat(salon.longitude),
        };
    }
}
