import { Component, Input } from '@angular/core';
import { Image } from '../../models/image.model';

@Component({
    selector: 'app-salon-images',
    templateUrl: './salon-images.component.html',
    styleUrl: './salon-images.component.scss',
})
export class SalonImagesComponent {
    @Input()
    images!: Image[];
}
