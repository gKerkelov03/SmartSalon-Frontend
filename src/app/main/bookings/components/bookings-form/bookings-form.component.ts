import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, finalize, take, takeUntil } from 'rxjs';
import { CrudAction } from '../../../../core/enums/crud-action';
import { LocalStorageService } from '../../../../core/services/local-storage.service';
import { formatDate } from '../../../../core/utils/format-date';
import { getErrorMessages } from '../../../../core/utils/get-error-message';
import { Booking } from '../../models/booking.model';
import { BookingsService } from '../../services/bookings.service';

@Component({
    selector: 'app-create-booking-form',
    templateUrl: './bookings-form.component.html',
    styleUrls: ['./bookings-form.component.scss'],
})
export class BookingsFormComponent implements OnInit, OnDestroy {
    bookingsForm!: FormGroup;
    destroy$: Subject<void> = new Subject();
    loading: boolean = false;
    isEditingBooking: boolean = false;
    title: string = 'Create booking';

    constructor(
        private formBuilder: FormBuilder,
        private bookingsService: BookingsService,
        private snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA)
        private dialogData:
            | string
            | { date: Date; isMonthView: boolean }
            | null, //if the dialogData is number then it's an bookingId
        private dialogRef: MatDialogRef<BookingsFormComponent>,
        private localStorage: LocalStorageService,
    ) {}

    get startDateControl(): AbstractControl | null {
        return this.bookingsForm.get('startDate');
    }

    get startTimeControl(): AbstractControl | null {
        return this.bookingsForm.get('startTime');
    }

    get endTimeControl(): AbstractControl | null {
        return this.bookingsForm.get('endTime');
    }

    get durationInMinutesControl(): AbstractControl | null {
        return this.bookingsForm.get('durationInMinutes');
    }

    ngOnInit(): void {
        this.isEditingBooking = typeof this.dialogData === 'number';

        if (this.isEditingBooking) {
            this.title = 'Edit booking';
        }

        this.setupTheBookingsForm();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.unsubscribe();
    }

    onSubmit(): void {
        this.loading = true;

        if (!this.isEditingBooking) {
            this.createBooking();
        } else if (this.isEditingBooking) {
            this.editBooking();
        }
    }

    createBooking(): void {
        const bookingDate = new Date(this.startDateControl?.value),
            dateToSendToTheBackend = `${formatDate(bookingDate)} ${
                this.startTimeControl?.value
            }`,
            formValue = this.bookingsForm.value;

        formValue.startTime = dateToSendToTheBackend;

        const observer = {
            next: (booking: Booking) => {
                this.dialogRef.close(booking);

                this.bookingsService.bookingsChangeSubject.next({
                    action: CrudAction.Created,
                    bookingId: booking.id,
                });

                this.snackBar.open('Successfully created an booking', 'Ok');
            },
            error: (httpError: HttpErrorResponse) => {
                this.snackBar.open(getErrorMessages(httpError), 'Close');
            },
        };

        this.bookingsService
            .create(formValue)
            .pipe(
                takeUntil(this.destroy$),
                finalize(() => (this.loading = false)),
            )
            .subscribe(observer);
    }

    editBooking(): void {
        const bookingDate = new Date(this.startDateControl?.value),
            dateToSendToTheBackend = `${formatDate(bookingDate)} ${
                this.startTimeControl?.value
            }`,
            formValue = this.bookingsForm.value;

        formValue.startTime = dateToSendToTheBackend;

        const observer = {
            next: (booking: Booking) => {
                this.snackBar.open(`Successfully updated booking.`, 'Ok');
                this.dialogRef.close();
                this.bookingsService.bookingsChangeSubject.next({
                    action: CrudAction.Updated,
                    bookingId: booking.id,
                });
            },
            error: (httpError: HttpErrorResponse) => {
                this.snackBar.open(getErrorMessages(httpError), 'Close');
            },
        };

        const bookingId = this.dialogData as string;

        // this.bookingsService
        //     .update(bookingId, formValue)
        //     .pipe(take(1))
        //     .subscribe(observer);
    }

    setupTheBookingsForm(): void {
        let prefilledDate = '',
            prefilledTime = '',
            dayToExtractDataFrom = new Date();

        let startTimeHour = dayToExtractDataFrom.getHours(),
            startTimeMinutes = dayToExtractDataFrom.getMinutes();

        prefilledDate = formatDate(dayToExtractDataFrom);
        prefilledTime =
            String(startTimeHour).padStart(2, '0') +
            ':' +
            String(startTimeMinutes).padStart(2, '0');

        this.bookingsForm = this.formBuilder.group({
            title: new FormControl('', [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(64),
            ]),
            DurationInMinutes: new FormControl(''),
            startDate: new FormControl(prefilledDate, [Validators.required]),
            startTime: new FormControl(prefilledTime, [Validators.required]),
            durationInMinutes: new FormControl('', [Validators.required]),
        });

        if (typeof this.dialogData === 'number') {
            // aka if is showing more info about booking
            this.bookingsService
                .getById(this.dialogData)
                .pipe(take(1))
                .subscribe((booking: Booking) => {
                    this.bookingsForm.setValue({
                        duration: booking.durationInMinutes,
                    });
                });
        }
    }
}
