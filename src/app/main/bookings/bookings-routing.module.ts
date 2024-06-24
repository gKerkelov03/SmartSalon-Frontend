import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingsHistoryPageComponent } from './pages/bookings-history-page/bookings-history-page.component';
import { CustomerBookingsPageComponent } from './pages/customer-bookings-page/customer-bookings-page.component';
import { CustomerHistoryPageComponent } from './pages/customer-history-page/customer-history-page.component';
import { SalonSchedulePageComponent } from './pages/salon-schedule-page/salon-schedule-page.component';
import { WorkerCalendarPageComponent } from './pages/worker-calendar-page/worker-calendar-page.component';

const routes: Routes = [
    {
        path: 'my-bookings',
        component: CustomerBookingsPageComponent,
    },
    {
        path: 'my-calendar',
        component: WorkerCalendarPageComponent,
    },
    {
        path: 'bookings-history/:id',
        component: BookingsHistoryPageComponent,
    },
    {
        path: 'salon-schedule/:id',
        component: SalonSchedulePageComponent,
    },
    {
        path: 'customer-history',
        component: CustomerHistoryPageComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class BoookingsRoutingModule {}
