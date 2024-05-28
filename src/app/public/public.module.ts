import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FooterComponent } from './components/footer/footer.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RestorePasswordFormComponent } from './components/restore-password-form/restore-password-form.component';
import { EmailsHandlerPageComponent } from './pages/emails-handler-page/emails-handler-page.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { RestorePasswordPageComponent } from './pages/restore-password-page/restore-password-page.component';
import { PublicRoutingModule } from './public-routing.module';

@NgModule({
    declarations: [
        FooterComponent,
        NavbarComponent,
        LandingPageComponent,
        RegisterPageComponent,
        LoginPageComponent,
        LoginFormComponent,
        RestorePasswordPageComponent,
        RestorePasswordFormComponent,
        EmailsHandlerPageComponent,
    ],
    imports: [
        RouterModule,
        CommonModule,
        MatProgressSpinnerModule,
        MatTooltipModule,
        ReactiveFormsModule,
        MatNativeDateModule,
        MatButtonModule,
        MatTooltipModule,
        MatInputModule,
        MatFormFieldModule,
        MatRadioModule,
        MatDatepickerModule,
        MatSnackBarModule,
        PublicRoutingModule,
        MatIconModule,
        SharedModule,
    ],
})
export class PublicModule {}
