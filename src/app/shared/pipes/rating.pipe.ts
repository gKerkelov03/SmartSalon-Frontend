import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'rating',
})
export class RatingPipe implements PipeTransform {
    transform(rating: number): string {
        if (rating === parseInt(rating.toString())) {
            return `${rating}.0`;
        }

        return rating.toFixed(1);
    }
}
