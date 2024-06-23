import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, debounceTime, map, startWith, tap } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { blankProfilePictureUrl } from '../../../../core/constants/urls';
import { isValidUrl } from '../../../../core/utils/is-valid-url';
import { Salon } from '../../models/salon.model';

@Component({
    selector: 'app-salons-map',
    templateUrl: './salons-map.component.html',
    styleUrl: './salons-map.component.scss',
})
export class SalonsMapComponent implements OnInit, OnChanges {
    @Input()
    userLocation!: google.maps.LatLngLiteral;
    @Input()
    zoom!: number;
    @Input()
    salons!: Salon[];
    allSalons!: Salon[];
    @Output()
    salonSelected: EventEmitter<Salon> = new EventEmitter<Salon>();
    mapId = environment.googleMaps.mapId;
    mapOptions: google.maps.MapOptions = {
        mapTypeControl: false,
        fullscreenControl: false,
    };
    userLocationIndicatorOptions: google.maps.CircleOptions = {
        fillOpacity: 1,
        fillColor: '#0000FF',
        strokeColor: '#0000FF',
    };
    isValidUrl = isValidUrl;
    blankProfilePictureUrl = blankProfilePictureUrl;
    salonsControl = new FormControl('');
    autocompleteOptions!: Observable<Salon[]>;

    constructor() {}
    ngOnChanges(changes: SimpleChanges): void {
        this.allSalons = changes['salons'].currentValue;
    }

    ngOnInit(): void {
        this.keepTheAutocompleteAndTheMapMarkersUpdatedBasedOnTheSearchTerm();
    }

    keepTheAutocompleteAndTheMapMarkersUpdatedBasedOnTheSearchTerm(): void {
        this.autocompleteOptions = this.salonsControl.valueChanges.pipe(
            startWith(''),
            debounceTime(300),
            tap((searchTerm) => {
                if (!searchTerm) {
                    this.salons = this.allSalons;
                }
            }),
            map((searchTerm) => {
                const filteredSalons = this.salons.filter(
                    (salon) =>
                        salon.name
                            .toLowerCase()
                            .includes(searchTerm!.toLowerCase()) ||
                        salon.googleMapsLocation
                            .toLowerCase()
                            .includes(searchTerm!.toLowerCase()),
                );

                this.salons = filteredSalons;
                return filteredSalons;
            }),
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
