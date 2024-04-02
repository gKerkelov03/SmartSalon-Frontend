import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: '',
                redirectTo: 'salons',
                pathMatch: 'full',
            },
            {
                path: 'users',
                loadChildren: () =>
                    import('./users/users.module').then(
                        (usersModule) => usersModule.UsersModule
                    ),
            },
            {
                path: 'salons',
                loadChildren: () =>
                    import('./salons/salons.module').then(
                        (salonsModule) => salonsModule.SalonsModule
                    ),
            },
            {
                path: 'bookings',
                loadChildren: () =>
                    import('./bookings/bookings.module').then(
                        (bookingsModule) => bookingsModule.BookingsModule
                    ),
            },
            {
                path: 'subscriptions',
                loadChildren: () =>
                    import('./subscriptions/subscriptions.module').then(
                        (subscriptions) => subscriptions.SubscriptionsModule
                    ),
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MainRoutingModule {}
