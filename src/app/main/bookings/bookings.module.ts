import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { SharedModule } from '../../shared/shared.module';
import { BoookingsRoutingModule } from './bookings-routing.module';
import { BookingsFormComponent } from './components/bookings-form/bookings-form.component';
import { MoreInfoAboutBookingComponent } from './components/more-info-about-booking/more-info-about-booking.component';
import { WorkerCalendarComponent } from './components/worker-calendar/worker-calendar.component';
import { CustomerBookingsPageComponent } from './pages/customer-bookings-page/customer-bookings-page.component';
import { CustomerHistoryPageComponent } from './pages/customer-history-page/customer-history-page.component';
import { WorkerCalendarPageComponent } from './pages/worker-calendar-page/worker-calendar-page.component';

@NgModule({
    declarations: [
        CustomerBookingsPageComponent,
        WorkerCalendarPageComponent,
        WorkerCalendarComponent,
        CustomerHistoryPageComponent,
        BookingsFormComponent,
        BookingsFormComponent,
        MoreInfoAboutBookingComponent,
    ],
    imports: [
        CommonModule,
        MatButtonModule,
        BoookingsRoutingModule,
        SharedModule,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule,

        MatFormFieldModule,
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory,
        }),
    ],
})
export class BookingsModule {}
