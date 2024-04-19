import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BoookingsRoutingModule } from './bookings-routing.module';
import { CustomerBookingsPageComponent } from './pages/customer-bookings-page/customer-bookings-page.component';
import { CustomerHistoryPageComponent } from './pages/customer-history-page/customer-history-page.component';
import { WorkerCalendarPageComponent } from './pages/worker-calendar-page/worker-calendar-page.component';

@NgModule({
    declarations: [
        CustomerBookingsPageComponent,
        WorkerCalendarPageComponent,
        CustomerHistoryPageComponent,
    ],
    imports: [CommonModule, BoookingsRoutingModule],
})
export class BookingsModule {}
