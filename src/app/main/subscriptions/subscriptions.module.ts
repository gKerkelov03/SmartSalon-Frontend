import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CustomerOngoingSubscriptionsPageComponent } from './pages/customer-ongoing-subscriptions-page/customer-ongoing-subscriptions-page.component';
import { SubscriptionsRoutingModule } from './subscriptions-routing.module';

@NgModule({
    declarations: [CustomerOngoingSubscriptionsPageComponent],
    imports: [CommonModule, SubscriptionsRoutingModule],
})
export class SubscriptionsModule {}
