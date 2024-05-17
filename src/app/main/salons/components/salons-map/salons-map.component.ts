import { Component, Input } from '@angular/core';
import { mapId } from '../../../../core/constants/googleMaps';
import { SalonWithCoordinates } from '../../models/salon-with-coordinates.model';

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
    salons!: SalonWithCoordinates[];
    mapId = mapId;
    mapOptions: google.maps.MapOptions = {
        mapTypeControl: false,
    };

    moveMap(event: google.maps.MapMouseEvent) {
        this.center = event.latLng!.toJSON();
    }
}
