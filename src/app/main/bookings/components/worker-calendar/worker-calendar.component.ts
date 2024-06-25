import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { isSameDay, isSameMonth } from 'date-fns';
import {
    Subject,
    catchError,
    delay,
    finalize,
    map,
    of,
    switchMap,
    take,
    takeUntil,
} from 'rxjs';
import { CrudAction } from '../../../../core/enums/crud-action';
import { CurrentUserService } from '../../../../core/services/current-user.service';
import { BookingsFormComponent } from '../../../bookings/components/bookings-form/bookings-form.component';
import { BookingChange } from '../../../bookings/models/booking-change-model';
import { Worker } from '../../../users/models/worker.model';
import { Booking } from '../../models/booking.model';
import { BookingsService } from '../../services/bookings.service';
import { MoreInfoAboutBookingComponent } from '../more-info-about-booking/more-info-about-booking.component';

@Component({
    selector: 'app-worker-calendar',
    templateUrl: './worker-calendar.component.html',
    styleUrl: './worker-calendar.component.scss',
})
export class WorkerCalendarComponent implements OnInit, OnDestroy {
    @Input() worker!: Worker;
    view: CalendarView = CalendarView.Month;
    CalendarView = CalendarView;
    viewDate: Date = new Date();
    calendarEvents: CalendarEvent[] = [];
    bookings!: Booking[];
    activeDayIsOpen: boolean = true;
    destroy$: Subject<void> = new Subject();

    constructor(
        private bookingsService: BookingsService,
        private dialog: MatDialog,
        public currentUser: CurrentUserService,
    ) {}

    ngOnInit(): void {
        this.fetchBookings();
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

                if (booking === null || action === CrudAction.Delete) {
                    this.deleteBookingWithId(bookingId);
                } else if (action === CrudAction.Create) {
                    this.addCalendarEvent(booking);
                    this.calendarEvents = [...this.calendarEvents];
                } else if (action === CrudAction.Update) {
                    this.deleteBookingWithId(bookingId);
                    this.addCalendarEvent(booking);
                }
            });
    }

    fetchBookings(): void {
        this.bookingsService
            .getWorkerBookings(this.worker.id)
            .pipe(
                take(1),
                finalize(
                    () => (this.calendarEvents = [...this.calendarEvents]),
                ),
            )
            .subscribe((response: Booking[]) => {
                this.bookings = response;
                response.forEach((booking) => this.addCalendarEvent(booking));
            });
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

    dayClicked({
        date,
        events,
    }: {
        date: Date;
        events: CalendarEvent[];
    }): void {
        if (isSameMonth(date, this.viewDate)) {
            if (
                (isSameDay(this.viewDate, date) &&
                    this.activeDayIsOpen === true) ||
                events.length === 0
            ) {
                this.activeDayIsOpen = false;
            } else {
                this.activeDayIsOpen = true;
            }
            this.viewDate = date;
        }
    }

    hourSegmentClicked({ date }: { date: Date }) {
        this.openTheBookingsFormWithPrefilledStartTime(date, false);
    }

    deleteBookingWithId(id: string): void {
        this.bookings = this.bookings.filter(
            (booking: Booking) => booking.id !== id,
        );

        this.calendarEvents = [];
        this.bookings.forEach((booking) => this.addCalendarEvent(booking));
    }

    setView(view: CalendarView): void {
        this.view = view;
    }

    addCalendarEvent(booking: Booking) {
        this.calendarEvents.push({
            id: booking.id,
            title: `${booking.customerFirstName} ${booking.customerLastName} - ${booking.serviceName}`,
            start: new Date(`${booking.date}T${booking.startTime}`),
            end: new Date(`${booking.date}T${booking.endTime}`),
        });
    }

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
            width: '30vw',
            autoFocus: false,
            panelClass: ['round-without-padding', 'modal-container'],
            data: this.bookings.find((booking) => booking.id === event.id),
        });
    }
}
