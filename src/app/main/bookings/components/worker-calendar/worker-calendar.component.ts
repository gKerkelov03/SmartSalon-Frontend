import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
    CalendarEvent,
    CalendarMonthViewDay,
    CalendarView,
} from 'angular-calendar';
import { isSameDay } from 'date-fns';
import {
    Subject,
    catchError,
    delay,
    map,
    of,
    switchMap,
    takeUntil,
} from 'rxjs';
import { CrudAction } from '../../../../core/enums/crud-action';
import { CurrentUserService } from '../../../../core/services/current-user.service';
import { BookingsFormComponent } from '../../../bookings/components/bookings-form/bookings-form.component';
import { MoreInfoAboutBookingComponent } from '../../../bookings/components/more-info-about-booking/more-info-about-booking.component';
import { BookingChange } from '../../../bookings/models/booking-change-model';
import { Booking } from '../../models/booking.model';
import { BookingsService } from '../../services/bookings.service';

@Component({
    selector: 'app-worker-calendar',
    templateUrl: './worker-calendar.component.html',
    styleUrl: './worker-calendar.component.scss',
})
export class WorkerCalendarComponent implements OnInit, OnDestroy {
    view: CalendarView = CalendarView.Month;
    CalendarView = CalendarView;
    viewDate: Date = new Date();
    calendarEvents: CalendarEvent[] = [];
    activeDayIsOpen: boolean = true;
    destroy$: Subject<void> = new Subject();

    constructor(
        private bookingsService: BookingsService,
        private dialog: MatDialog,
        public currentUser: CurrentUserService,
    ) {}

    ngOnInit(): void {
        this.populateTheCalendarWithBookings();
        this.keepTheCalendarInformedAboutBookingChanges();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.unsubscribe();
    }

    keepTheCalendarInformedAboutBookingChanges(): void {
        this.bookingsService.bookingsChangeSubject
            .pipe(
                takeUntil(this.destroy$),
                switchMap(({ action, bookingId }: BookingChange) =>
                    this.bookingsService.getById(bookingId).pipe(
                        catchError(() => of(null)),
                        map((booking) => {
                            //We are returning both booking and bookingId because if a booking
                            //gets deleted the booking parameter will be null and we cannot access its id with booking.id
                            return { action, booking, bookingId };
                        }),
                    ),
                ),
            )
            .subscribe((result) => {
                const { action, booking, bookingId } = result;

                if (booking === null) {
                    this.deleteBookingWithId(bookingId);
                } else if (action === CrudAction.Create) {
                    this.addBooking(booking);
                    this.calendarEvents = [...this.calendarEvents];
                } else if (action === CrudAction.Update) {
                    this.deleteBookingWithId(bookingId);
                    this.addBooking(booking);
                }
            });
    }

    populateTheCalendarWithBookings(): void {
        // this.bookingsService
        //     .getAll()
        //     .pipe(
        //         take(1),
        //         finalize(() => (this.calendarEvents = [...this.calendarEvents]))
        //     )
        //     .subscribe((response: Booking[]) =>
        //         response.forEach((booking) => this.addBooking(booking))
        //     );
    }

    openTheBookingsFormWithPrefilledStartTime(
        date: Date,
        isMonthView: boolean,
    ): void {
        if (isMonthView) {
            const today = new Date();
            date.setHours(today.getHours());
            date.setMinutes(today.getMinutes());
        }

        this.dialog.open(BookingsFormComponent, {
            width: '60vw',
            autoFocus: false,
            disableClose: true,
            panelClass: 'round-without-padding',
            data: {
                date,
                isMonthView,
            },
        });
    }

    dayClicked(parameter: CalendarMonthViewDay): void {
        const date = new Date(parameter.date);
        this.openTheBookingsFormWithPrefilledStartTime(date, true);

        if (
            (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
            this.calendarEvents.length === 0
        ) {
            this.activeDayIsOpen = false;
        } else {
            this.activeDayIsOpen = true;
        }

        this.viewDate = date;
    }

    hourSegmentClicked({ date }: { date: Date }) {
        this.openTheBookingsFormWithPrefilledStartTime(date, false);
    }

    deleteBookingWithId(id: string): void {
        // this.bookings = this.bookings.filter(
        //     (booking: CalendarEvent) => booking.id !== id
        // );
    }

    setView(view: CalendarView): void {
        this.view = view;
    }

    addBooking(booking: Booking) {}

    closeOpenMonthViewDay(): void {
        this.activeDayIsOpen = false;
    }

    scrollToTheCurrentTimeMarker(): void {
        const currentTimeMarkerSelector = '.cal-current-time-marker';

        of([])
            .pipe(delay(300))
            .subscribe(() => {
                const element = document.querySelector(
                    currentTimeMarkerSelector,
                );

                element?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                });
            });
    }

    bookingClicked(event: CalendarEvent): void {
        this.dialog.open(MoreInfoAboutBookingComponent, {
            width: '60vw',
            autoFocus: false,
            panelClass: ['round-without-padding', 'modal-container'],
            data: event.id,
        });
    }
}
