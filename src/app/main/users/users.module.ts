import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from '../../shared/shared.module';
import { ChangeCredentialComponent } from './components/change-credential/change-credential.component';
import { ChangeEmailComponent } from './components/change-email/change-email.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { PersonalInformationFormComponent } from './components/personal-information-form/personal-information-form.component';
import { PersonalInformation } from './components/personal-information/personal-information.component';
import { ProfileHeaderComponent } from './components/profile-header/profile-header-section.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
    declarations: [
        ProfilePageComponent,
        ProfileHeaderComponent,
        PersonalInformation,
        PersonalInformationFormComponent,
        ChangeEmailComponent,
        ChangePasswordComponent,
        ChangeCredentialComponent,
    ],
    imports: [
        CommonModule,
        UsersRoutingModule,
        MatCardModule,
        MatTooltipModule,
        MatButtonModule,
        MatSnackBarModule,
        MatDatepickerModule,
        MatNativeDateModule,
        SharedModule,
        MatInputModule,
        MatFormFieldModule,
        MatRadioModule,
        MatExpansionModule,
        MatStepperModule,
        MatIconModule,
        ReactiveFormsModule,
    ],
})
export class UsersModule {}
