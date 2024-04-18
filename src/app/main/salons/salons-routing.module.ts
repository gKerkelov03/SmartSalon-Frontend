import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MySalonsPageComponent } from './pages/my-salons-page/my-salons-page.component';
import { SalonDetailsPageComponent } from './pages/salon-details-page/salon-details-page.component';
import { SearchSalonsPageComponent } from './pages/search-salons-page/search-salons-page.component';

const routes: Routes = [
    {
        path: '',
        component: SearchSalonsPageComponent,
        pathMatch: 'full',
    },
    {
        path: 'my-salons',
        component: MySalonsPageComponent,
    },
    {
        path: ':id',
        component: SalonDetailsPageComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SalonsRoutingModule {}
