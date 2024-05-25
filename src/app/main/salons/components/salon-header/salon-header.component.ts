import { Component, Input } from '@angular/core';
import { createRange } from '../../../../core/utils/create-range';

@Component({
    selector: 'app-salon-header',
    templateUrl: './salon-header.component.html',
    styleUrl: './salon-header.component.scss',
})
export class SalonHeaderComponent {
    @Input()
    name!: string;

    @Input()
    rating!: number;

    createRange = createRange;

    shouldDisplayHalfReviewStar() {
        const fractionalPart = this.rating - parseInt(this.rating.toString());

        if (fractionalPart > 0.5) {
            return true;
        }

        return false;
    }
}
