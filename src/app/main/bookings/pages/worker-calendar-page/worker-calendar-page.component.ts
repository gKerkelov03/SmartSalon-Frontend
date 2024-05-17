import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CurrentUserService } from '../../../../core/services/current-user.service';
import { BookingsFormComponent } from '../../components/bookings-form/bookings-form.component';

@Component({
    selector: 'app-worker-calendar-page',
    templateUrl: './worker-calendar-page.component.html',
    styleUrl: './worker-calendar-page.component.scss',
})
export class WorkerCalendarPageComponent {
    constructor(
        private dialog: MatDialog,
        public currentUser: CurrentUserService,
    ) {}

    displayEventDialog(): void {
        this.dialog.open(BookingsFormComponent);
    }
}
