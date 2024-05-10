import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SharedModule } from '../../shared/shared.module';
import { SalonDetailsHeaderComponent } from './components/salon-details-header/salon-details-header.component';
import { SalonInfoFormComponent } from './components/salon-info-form/salon-info-form.component';
import { SalonsMapComponent } from './components/salons-map/salons-map.component';
import { SalonsSearchBarComponent } from './components/salons-search-bar/salons-search-bar.component';
import { MySalonsPageComponent } from './pages/my-salons-page/my-salons-page.component';
import { SalonDetailsPageComponent } from './pages/salon-details-page/salon-details-page.component';
import { SearchSalonsPageComponent } from './pages/search-salons-page/search-salons-page.component';
import { SalonsRoutingModule } from './salons-routing.module';

@NgModule({
    declarations: [
        SalonDetailsPageComponent,
        SearchSalonsPageComponent,
        MySalonsPageComponent,
        SalonsMapComponent,
        SalonInfoFormComponent,
        SalonsSearchBarComponent,
        SalonDetailsHeaderComponent,
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
        MatButtonModule,
        MatIconModule,
        MatAutocompleteModule,
        MatSnackBarModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatRadioModule,
        MatSelectModule,
    ],
})
export class SalonsModule {}
