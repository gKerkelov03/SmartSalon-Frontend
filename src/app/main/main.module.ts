import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioButton } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedModule } from '../shared/shared.module';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';

@NgModule({
    declarations: [MainComponent],
    imports: [
        CommonModule,
        MainRoutingModule,
        SharedModule,
        MatSidenavModule,
        MatButtonModule,
        MatToolbarModule,
        MatRadioButton,
        MatIconModule,
    ],
})
export class MainModule {}
