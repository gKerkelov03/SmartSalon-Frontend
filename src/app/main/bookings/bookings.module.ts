import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BoookingsRoutingModule } from './bookings-routing.module';
import { CustomerActiveBookingsPageComponent } from './pages/customer-active-bookings-page/customer-active-bookings-page.component';
import { WorkerBookingsPageComponent } from './pages/worker-bookings-page/worker-bookings-page.component';

@NgModule({
    declarations: [
        CustomerActiveBookingsPageComponent,
        WorkerBookingsPageComponent,
    ],
    imports: [CommonModule, BoookingsRoutingModule],
})
export class BookingsModule {}
