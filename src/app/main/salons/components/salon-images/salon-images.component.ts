import { Component, Input, OnInit } from '@angular/core';
import { Image } from '../../models/image.model';

@Component({
    selector: 'app-salon-images',
    templateUrl: './salon-images.component.html',
    styleUrl: './salon-images.component.scss',
})
export class SalonImagesComponent implements OnInit {
    @Input()
    images!: Image[];

    currentImageIndex!: number;

    ngOnInit(): void {
        this.currentImageIndex = 0;
    }

    jumpToImage(index: number) {
        if (index === this.images.length) {
            index = 0;
        } else if (index === -1) {
            index = this.images.length - 1;
        }

        this.currentImageIndex = index;
    }
}
