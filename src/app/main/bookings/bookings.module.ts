import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { SharedModule } from '../../shared/shared.module';
import { BoookingsRoutingModule } from './bookings-routing.module';
import { BookingsFormComponent } from './components/bookings-form/bookings-form.component';
import { MoreInfoAboutBookingComponent } from './components/more-info-about-booking/more-info-about-booking.component';
import { WorkerCalendarComponent } from './components/worker-calendar/worker-calendar.component';
import { CustomerBookingsPageComponent } from './pages/customer-bookings-page/customer-bookings-page.component';
import { CustomerHistoryPageComponent } from './pages/customer-history-page/customer-history-page.component';
import { SalonSchedulePageComponent } from './pages/salon-schedule-page/salon-schedule-page.component';
import { WorkerCalendarPageComponent } from './pages/worker-calendar-page/worker-calendar-page.component';
import { BookingsHistoryComponent } from './pages/bookings-history/bookings-history.component';
import { BookingsHistoryPageComponent } from './pages/bookings-history-page/bookings-history-page.component';

@NgModule({
    declarations: [
        CustomerBookingsPageComponent,
        WorkerCalendarPageComponent,
        WorkerCalendarComponent,
        CustomerHistoryPageComponent,
        BookingsFormComponent,
        BookingsFormComponent,
        MoreInfoAboutBookingComponent,
        SalonSchedulePageComponent,
        BookingsHistoryComponent,
        BookingsHistoryPageComponent,
    ],
    imports: [
        CommonModule,
        MatButtonModule,
        MatTabsModule,
        MatCardModule,
        BoookingsRoutingModule,
        SharedModule,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatFormFieldModule,
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory,
        }),
    ],
})
export class BookingsModule {}
