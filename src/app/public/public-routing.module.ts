import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessDeniedPageComponent } from '../shared/pages/access-denied-page/access-denied-page.component';
import { EmailsHandlerPageComponent } from './pages/emails-handler-page/emails-handler-page.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { RestorePasswordPageComponent } from './pages/restore-password-page/restore-password-page.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'landing-page',
        pathMatch: 'full',
    },
    { path: 'landing-page', component: LandingPageComponent },
    {
        path: 'login',
        component: LoginPageComponent,
    },
    {
        path: 'register',
        component: RegisterPageComponent,
    },
    {
        path: 'restore-password',
        component: RestorePasswordPageComponent,
    },
    {
        path: 'emails-handler',
        component: EmailsHandlerPageComponent,
    },
    { path: 'access-denied', component: AccessDeniedPageComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PublicRoutingModule {}
