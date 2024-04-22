import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full',
    },
    {
        path: 'profile',
        component: ProfilePageComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UsersRoutingModule {}
