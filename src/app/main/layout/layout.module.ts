import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { SideItemComponent } from './side-item/side-item.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
    declarations: [HeaderComponent, SidebarComponent, SideItemComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        SharedModule,
        MatIconModule,
        MatMenuModule,
        MatSlideToggleModule,
        MatButtonModule,
        MatDialogModule,
        MatInputModule,
        MatSnackBarModule,
        MatToolbarModule,
    ],
    exports: [HeaderComponent, SidebarComponent],
})
export class LayoutModule {}
