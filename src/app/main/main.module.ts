import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from '../shared/shared.module';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';

@NgModule({
    declarations: [MainComponent],
    imports: [
        CommonModule,
        MainRoutingModule,
        SharedModule,
        MatTooltipModule,
        MatDividerModule,
        MatButtonModule,
        MatMenuModule,
        MatToolbarModule,
        MatIconModule,
    ],
})
export class MainModule {}
