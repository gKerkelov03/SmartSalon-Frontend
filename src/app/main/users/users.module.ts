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
import { SharedModule } from '../../shared/shared.module';
import { ChangeCredentialComponent } from './components/change-credential/change-credential.component';
import { ChangeEmailComponent } from './components/change-email/change-email.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { DeleteAccountComponent } from './components/delete-account/delete-account.component';
import { PersonalInformationFormComponent } from './components/personal-information-form/personal-information-form.component';
import { ProfileChangeDataSectionComponent } from './components/personal-information-section/personal-information-section.component';
import { ProfileHeaderSectionComponent } from './components/profile-header-section/profile-header-section.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
    declarations: [
        ProfilePageComponent,
        ProfileHeaderSectionComponent,
        ProfileChangeDataSectionComponent,
        PersonalInformationFormComponent,
        ChangeEmailComponent,
        ChangePasswordComponent,
        DeleteAccountComponent,
        ChangeCredentialComponent,
    ],
    imports: [
        CommonModule,
        UsersRoutingModule,
        MatCardModule,
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
