import { Component, Input } from '@angular/core';
import { DayOfWeek } from '../../../../core/enums/day-of-week';

@Component({
    selector: 'app-daily-working-time',
    templateUrl: './daily-working-time.component.html',
    styleUrl: './daily-working-time.component.scss',
})
export class DailyWorkingTimeComponent {
    @Input()
    dayDisplaying!: DayOfWeek;

    @Input()
    today!: DayOfWeek;

    @Input()
    isWorking!: boolean;

    @Input()
    openingTime!: string;

    @Input()
    closingTime!: string;
}
