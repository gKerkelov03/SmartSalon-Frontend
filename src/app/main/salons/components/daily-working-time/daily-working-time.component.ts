import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { DayOfWeek } from '../../../../core/enums/day-of-week';
import { CurrentUserService } from '../../../../core/services/current-user.service';
import { WorkingTimesService } from '../../services/working-times.service';

@Component({
    selector: 'app-daily-working-time',
    templateUrl: './daily-working-time.component.html',
    styleUrl: './daily-working-time.component.scss',
})
export class DailyWorkingTimeComponent {
    @Input()
    salonId!: string;

    @Input()
    day!: DayOfWeek;

    @Input()
    today!: DayOfWeek;

    @Input()
    isWorking!: boolean;

    @Input()
    openingTime!: string;

    @Input()
    closingTime!: string;

    @ViewChild('openingTimeInput')
    openingTimeInput!: ElementRef;

    @ViewChild('closingTimeInput')
    closingTimeInput!: ElementRef;

    constructor(
        public currentUser: CurrentUserService,
        private workingTimesService: WorkingTimesService,
    ) {}

    updateIsWorking(): void {
        this.isWorking = !this.isWorking;
        this.saveChanges();
    }

    updateOpeningTime(newOpeningTime: string): void {
        this.openingTime = newOpeningTime.substring(0, 5);

        //TODO: find another way to do this
        setTimeout(() => {
            this.openingTimeInput.nativeElement.value = this.openingTime;
        }, 0);

        this.saveChanges();
    }

    updateClosingTime(newClosingTime: string): void {
        this.closingTime = newClosingTime.substring(0, 5);

        //TODO: find another way to do this
        setTimeout(() => {
            this.closingTimeInput.nativeElement.value = this.closingTime;
        }, 0);
        this.saveChanges();
    }

    saveChanges(): void {
        this.workingTimesService
            .updateWorkingTime(
                this.salonId,
                this.day,
                this.isWorking,
                this.openingTime,
                this.closingTime,
            )
            .subscribe();
    }

    get canEdit(): boolean {
        return this.currentUser.isAdmin || this.currentUser.isOwner;
    }
}
