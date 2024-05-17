import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'onlyHourAndMinutes',
})
export class OnlyHourAndMinutesPipe implements PipeTransform {
    transform(value: string): string {
        //The format is hour:minutes:seconds -> 07:00:00
        return value.substring(0, 5);
    }
}
