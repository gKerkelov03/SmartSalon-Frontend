import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CustomerSubscriptionsPageComponent } from './pages/customer-subscriptions-page/customer-subscriptions-page.component';
import { SubscriptionsRoutingModule } from './subscriptions-routing.module';

@NgModule({
    declarations: [CustomerSubscriptionsPageComponent],
    imports: [CommonModule, SubscriptionsRoutingModule],
})
export class SubscriptionsModule {}
