import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerActiveBookingsPageComponent } from './pages/customer-active-bookings-page/customer-active-bookings-page.component';
import { WorkerBookingsPageComponent } from './pages/worker-bookings-page/worker-bookings-page.component';

const routes: Routes = [
    {
        path: 'customer-active-bookings',
        component: CustomerActiveBookingsPageComponent,
    },
    {
        path: 'worker-bookings',
        component: WorkerBookingsPageComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class BoookingsRoutingModule {}
