import { Component, Input } from '@angular/core';
import { DayOfWeek } from '../../../../core/enums/day-of-week';
import { WorkingTime } from '../../models/working-time.model';

@Component({
    selector: 'app-salon-working-time',
    templateUrl: './salon-working-time.component.html',
    styleUrl: './salon-working-time.component.scss',
})
export class SalonWorkingTimeComponent {
    @Input()
    workingTime!: WorkingTime;
    today: DayOfWeek = this.getCurrentDay();
    DayOfWeek = DayOfWeek;

    getCurrentDay(): DayOfWeek {
        const date = new Date();
        const dayOfWeek = date.getDay();

        const days = [
            DayOfWeek.Sunday,
            DayOfWeek.Monday,
            DayOfWeek.Tuesday,
            DayOfWeek.Wednesday,
            DayOfWeek.Thursday,
            DayOfWeek.Friday,
            DayOfWeek.Saturday,
        ];

        return days[dayOfWeek];
    }
}
