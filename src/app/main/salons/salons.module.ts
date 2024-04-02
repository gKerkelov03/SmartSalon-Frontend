import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
import { SalonDetailsPageComponent } from './pages/salon-details-page/salon-details-page.component';
import { SearchSalonsPageComponent } from './pages/search-salons-page/search-salons-page.component';
import { SalonsRoutingModule } from './salons-routing.module';

@NgModule({
    declarations: [SalonDetailsPageComponent, SearchSalonsPageComponent],
    imports: [
        CommonModule,
        FormsModule,
        SalonsRoutingModule,
        SharedModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
        MatButtonModule,
        MatIconModule,
        MatSnackBarModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatRadioModule,
        MatSelectModule,
    ],
})
export class SalonsModule {}
