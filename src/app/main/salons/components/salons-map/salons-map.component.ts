import { Component, Input } from '@angular/core';
import { mapId } from '../../../../core/constants/googleMaps';
import { Salon } from '../../models/salon.model';

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

    openMoreInfoAboutSalonDialog(event: google.maps.MapMouseEvent) {
        var salon = this.salons.find(
            (salon) =>
                parseFloat(salon.latitude) === event.latLng?.lat() &&
                parseFloat(salon.longitude) === event.latLng?.lng(),
        );

        console.log(salon?.name);
    }

    getCoordinates(salon: Salon): google.maps.LatLngLiteral {
        return {
            lat: parseFloat(salon.latitude),
            lng: parseFloat(salon.longitude),
        };
    }
}
