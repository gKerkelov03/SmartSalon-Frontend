import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { mapId } from '../../../../core/constants/googleMaps';
import { Salon } from '../../models/salon.model';
import { SalonInfoDialogComponent } from '../salon-info-form/salon-info-dialog.component';

@Component({
    selector: 'app-salons-map',
    templateUrl: './salons-map.component.html',
    styleUrl: './salons-map.component.scss',
})
export class SalonsMapComponent {
    @Input()
    center!: google.maps.LatLngLiteral;
    @Input()
    zoom!: number;
    @Input()
    salons!: Salon[];
    mapId = mapId;
    mapOptions: google.maps.MapOptions = {
        mapTypeControl: false,
        fullscreenControl: false,
    };

    constructor(private dialog: MatDialog) {}

    myControl = new FormControl('');
    options: string[] = ['One', 'Two', 'Three'];
    openMoreInfoAboutSalonDialog(event: google.maps.MapMouseEvent) {
        var salon = this.salons.find(
            (salon) =>
                parseFloat(salon.latitude) === event.latLng?.lat() &&
                parseFloat(salon.longitude) === event.latLng?.lng(),
        );

        this.dialog.open(SalonInfoDialogComponent, {
            width: '50vw',
            autoFocus: false,
            panelClass: 'round-without-padding',
            data: salon,
            enterAnimationDuration: '300ms',
        });
    }

    getCoordinates(salon: Salon): google.maps.LatLngLiteral {
        return {
            lat: parseFloat(salon.latitude),
            lng: parseFloat(salon.longitude),
        };
    }
}
