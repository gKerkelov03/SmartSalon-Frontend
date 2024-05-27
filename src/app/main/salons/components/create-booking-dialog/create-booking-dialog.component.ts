import { Component, Inject, OnInit } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CurrentUserService } from '../../../../core/services/current-user.service';
import { BookingsService } from '../../../bookings/services/bookings.service';
import { Service } from '../../models/service.model';

@Component({
    selector: 'app-create-booking-dialog',
    templateUrl: './create-booking-dialog.component.html',
    styleUrl: './create-booking-dialog.component.scss',
})
export class CreateBookingDialogComponent implements OnInit {
    createBookingForm!: FormGroup;
    isTimeChosen: boolean = false;

    get workerControl(): AbstractControl {
        return this.createBookingForm.get('workerId')!;
    }

    get dateControl(): AbstractControl {
        return this.createBookingForm.get('date')!;
    }

    constructor(
        @Inject(MAT_DIALOG_DATA)
        public dialogData: {
            service: Service;
            workers: Worker[];
            salonId: string;
        },
        private snackBar: MatSnackBar,
        private bookingsService: BookingsService,
        private formBuilder: FormBuilder,
        private currentUser: CurrentUserService,
    ) {}

    ngOnInit(): void {
        this.setupTheCreateBookingForm();
    }

    setupTheCreateBookingForm(): void {
        this.createBookingForm = this.formBuilder.group({
            date: new FormControl('', [Validators.required]),
            workerId: new FormControl('', [Validators.required]),

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
}
