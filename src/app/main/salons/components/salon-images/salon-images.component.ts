import { Component, Input, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';
import { CreatedResponse } from '../../../../core/models/created-response.model';
import { Image } from '../../models/image.model';
import { ImagesService } from '../../services/images.service';

@Component({
    selector: 'app-salon-images',
    templateUrl: './salon-images.component.html',
    styleUrl: './salon-images.component.scss',
})
export class SalonImagesComponent implements OnInit {
    @Input()
    images!: Image[];

    @Input()
    canEdit!: boolean;

    @Input()
    salonId!: string;

    currentImageIndex!: number;

    constructor(private imagesService: ImagesService) {}

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

    addImage(newImageUrl: string) {
        this.imagesService
            .addImage(newImageUrl, this.salonId)
            .pipe(
                switchMap((response: CreatedResponse) =>
                    this.imagesService.getById(response.createdResourceId),
                ),
            )
            .subscribe((createdImage: Image) => {
                this.images.push(createdImage);
                this.jumpToImage(this.images.length - 1);
            });
    }

    deleteImage(imageToDelete: Image) {
        this.imagesService
            .removeImage(imageToDelete.id, this.salonId)
            .subscribe(() => {
                this.images.splice(
                    this.images.findIndex(
                        (image) => image.id == imageToDelete.id,
                    ),
                    1,
                );
            });
    }
}
