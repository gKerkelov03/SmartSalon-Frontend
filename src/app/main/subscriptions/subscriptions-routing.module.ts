import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerSubscriptionsPageComponent } from './pages/customer-subscriptions-page/customer-subscriptions-page.component';

const routes: Routes = [
    {
        path: '',
        component: CustomerSubscriptionsPageComponent,
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SubscriptionsRoutingModule {}
