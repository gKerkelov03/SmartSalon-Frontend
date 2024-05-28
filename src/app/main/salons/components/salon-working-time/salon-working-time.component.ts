import { Component, Input } from '@angular/core';
import { DayOfWeek } from '../../../../core/enums/day-of-week';
import { getDay } from '../../../../core/utils/get-day';
import { WorkingTime } from '../../models/working-time.model';

@Component({
    selector: 'app-salon-working-time',
    templateUrl: './salon-working-time.component.html',
    styleUrl: './salon-working-time.component.scss',
})
export class SalonWorkingTimeComponent {
    @Input()
    salonId!: string;
    @Input()
    workingTime!: WorkingTime;
    today: DayOfWeek = this.getCurrentDay();
    DayOfWeek = DayOfWeek;

    getCurrentDay(): DayOfWeek {
        return getDay(new Date().getDay());
    }
}
