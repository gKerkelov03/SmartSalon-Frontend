import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { SharedModule } from '../../shared/shared.module';
import { DailyWorkingTimeComponent } from './components/daily-working-time/daily-working-time.component';
import { EditSalonDescriptionDialogComponent } from './components/edit-salon-description-dialog/edit-salon-description-dialog.component';
import { SalonCardComponent } from './components/salon-card/salon-card.component';
import { SalonCurrenciesComponent } from './components/salon-currencies/salon-currencies.component';
import { SalonDescriptionComponent } from './components/salon-description/salon-description.component';
import { SalonHeaderComponent } from './components/salon-header/salon-header.component';
import { SalonImagesComponent } from './components/salon-images/salon-images.component';
import { SalonInfoDialogComponent } from './components/salon-info-form/salon-info-dialog.component';
import { SalonJobTitlesComponent } from './components/salon-job-titles/salon-job-titles.component';
import { SalonLocationComponent } from './components/salon-location/salon-location.component';
import { SalonMainPictureComponent } from './components/salon-main-picture/salon-main-picture.component';
import { SalonSectionsComponent } from './components/salon-sections/salon-sections.component';
import { SalonSpecialtiesComponent } from './components/salon-specialties/salon-specialties.component';
import { SalonSpecialtyDialogComponent } from './components/salon-specialty-dialog/salon-specialty-dialog.component';
import { SalonTeamComponent } from './components/salon-team/salon-team.component';
import { SalonWorkingTimeComponent } from './components/salon-working-time/salon-working-time.component';
import { SalonsMapComponent } from './components/salons-map/salons-map.component';
import { MySalonsPageComponent } from './pages/my-salons-page/my-salons-page.component';
import { SalonDetailsPageComponent } from './pages/salon-details-page/salon-details-page.component';
import { SearchSalonsPageComponent } from './pages/search-salons-page/search-salons-page.component';
import { SalonsRoutingModule } from './salons-routing.module';
import { DeleteSpecialtyDialogComponent } from './components/delete-specialty-dialog/delete-specialty-dialog.component';

@NgModule({
    declarations: [
        SalonDetailsPageComponent,
        SearchSalonsPageComponent,
        MySalonsPageComponent,
        SalonsMapComponent,
        SalonHeaderComponent,
        SalonInfoDialogComponent,
        SalonSpecialtiesComponent,
        SalonCurrenciesComponent,
        SalonImagesComponent,
        SalonDescriptionComponent,
        SalonWorkingTimeComponent,
        SalonSectionsComponent,
        SalonLocationComponent,
        DailyWorkingTimeComponent,
        SalonTeamComponent,
        SalonMainPictureComponent,
        SalonCardComponent,
        EditSalonDescriptionDialogComponent,
        SalonJobTitlesComponent,
        SalonSpecialtyDialogComponent,
        DeleteSpecialtyDialogComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SalonsRoutingModule,
        SharedModule,
        MatFormFieldModule,
        MatInputModule,
        GoogleMapsModule,
        MatDialogModule,
        MatChipsModule,
        MatProgressSpinnerModule,
        MatButtonModule,
        MatIconModule,
        MatAutocompleteModule,
        MatSnackBarModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSlideToggleModule,
        NgxMatTimepickerModule,
        MatRadioModule,
        MatSelectModule,
        MatTooltipModule,
        MatCardModule,
        MatDividerModule,
    ],
})
export class SalonsModule {}
