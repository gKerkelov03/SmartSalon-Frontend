import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';
import { blankProfilePictureUrl } from '../../../../core/constants/urls';
import { DayOfWeek } from '../../../../core/enums/day-of-week';
import { CurrentUserService } from '../../../../core/services/current-user.service';
import { formatDate } from '../../../../core/utils/format-date';
import { getDay } from '../../../../core/utils/get-day';
import { isValidUrl } from '../../../../core/utils/is-valid-url';
import { TimeSlot } from '../../../bookings/models/time-slot.model';
import { BookingsService } from '../../../bookings/services/bookings.service';
import { Worker } from '../../../users/models/worker.model';
import { Service } from '../../models/service.model';
import { WorkingTime } from '../../models/working-time.model';
//TODO: this component uses settimeout refactor it so it don't use
@Component({
    selector: 'app-create-booking-dialog',
    templateUrl: './create-booking-dialog.component.html',
    styleUrl: './create-booking-dialog.component.scss',
})
export class CreateBookingDialogComponent implements OnInit {
    @ViewChild('stepper') private stepper!: MatStepper;
    createBookingForm!: FormGroup;
    timeSlotsAvailable!: TimeSlot[];
    today = new Date();

    get workerControl(): AbstractControl {
        return this.createBookingForm.get('workerId')!;
    }

    get dateControl(): AbstractControl {
        return this.createBookingForm.get('date')!;
    }

    get timeControl(): AbstractControl {
        return this.createBookingForm.get('time')!;
    }

    isValidUrl = isValidUrl;
    blankProfilePictureUrl = blankProfilePictureUrl;
    formatDate = formatDate;

    constructor(
        @Inject(MAT_DIALOG_DATA)
        public dialogData: {
            service: Service;
            workers: Worker[];
            salonId: string;
            workingTime: WorkingTime;
        },
        private snackBar: MatSnackBar,
        private bookingsService: BookingsService,
        private formBuilder: FormBuilder,
        private dialogRef: MatDialogRef<CreateBookingDialogComponent>,
        private currentUser: CurrentUserService,
    ) {}

    ngOnInit(): void {
        this.setupTheCreateBookingForm();
    }

    setupTheCreateBookingForm(): void {
        this.createBookingForm = this.formBuilder.group({
            date: new FormControl('', [Validators.required]),
            workerId: new FormControl('', [Validators.required]),
            time: new FormControl('', [Validators.required]),

            customerId: new FormControl(this.currentUser.currentUser?.id, [
                Validators.required,
            ]),
            salonId: new FormControl(this.dialogData.salonId, [
                Validators.required,
            ]),
            serviceId: new FormControl(this.dialogData.service.id, [
                Validators.required,
            ]),
        });
    }

    workerSelected(worker: Worker) {
        this.workerControl.setValue(worker);

        setTimeout(() => {
            this.stepper.selectedIndex = 2;
            this.bookingsService
                .getAvailableTimeSlots({
                    serviceId: this.dialogData.service.id,
                    workerId: worker.id,
                    customerId: this.currentUser.currentUser!.id,
                    salonId: this.dialogData.salonId,
                    date: formatDate(this.dateControl.value),
                })
                .subscribe((timeSlotsAvailable: TimeSlot[]) => {
                    this.timeSlotsAvailable = timeSlotsAvailable;
                });
        }, 0);
    }

    salonWorkingDayFilter = (date: Date | null): boolean => {
        if (!date) {
            return false;
        }

        const day: DayOfWeek = getDay(date.getDay());
        const nonWorkingDaysForTheSalon = this.getTheNonWorkingDays();
        return !nonWorkingDaysForTheSalon.includes(day);
    };

    getTheNonWorkingDays = (): DayOfWeek[] => {
        const workingTime = this.dialogData.workingTime;
        const result = [];

        if (!workingTime.mondayIsWorking) {
            result.push(DayOfWeek.Monday);
        }

        if (!workingTime.tuesdayIsWorking) {
            result.push(DayOfWeek.Tuesday);
        }

        if (!workingTime.wednesdayIsWorking) {
            result.push(DayOfWeek.Wednesday);
        }

        if (!workingTime.thursdayIsWorking) {
            result.push(DayOfWeek.Thursday);
        }

        if (!workingTime.fridayIsWorking) {
            result.push(DayOfWeek.Friday);
        }

        if (!workingTime.saturdayIsWorking) {
            result.push(DayOfWeek.Saturday);
        }

        if (!workingTime.sundayIsWorking) {
            result.push(DayOfWeek.Sunday);
        }

        return result;
    };

    timeSelected(slot: TimeSlot) {
        this.timeControl.setValue(slot);

        setTimeout(() => {
            this.stepper.selectedIndex = 3;
        }, 0);
    }

    createBooking(): void {
        this.bookingsService
            .create({
                ...this.createBookingForm.value,
                startTime: this.timeControl.value.from,
                endTime: this.timeControl.value.to,
                workerId: this.workerControl.value.id,
                date: formatDate(this.dateControl.value),
            })
            .subscribe(() => this.dialogRef.close());
    }
}
