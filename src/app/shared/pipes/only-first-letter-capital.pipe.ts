import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'onlyFirstLetterCapital',
})
export class OnlyFirstLetterCapitalPipe implements PipeTransform {
    transform(value: string): string {
        const lowered = value.toLowerCase();

        return lowered[0].toUpperCase() + lowered.substring(1);
    }
}
