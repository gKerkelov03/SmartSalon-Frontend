import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerOngoingSubscriptionsPageComponent } from './pages/customer-ongoing-subscriptions-page/customer-ongoing-subscriptions-page.component';

const routes: Routes = [
    {
        path: '',
        component: CustomerOngoingSubscriptionsPageComponent,
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SubscriptionsRoutingModule {}
