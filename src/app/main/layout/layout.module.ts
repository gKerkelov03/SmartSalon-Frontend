import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { SidenavItemComponent } from './sidenav-item/sidenav-item.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ThemeSwitchComponent } from './theme-switch/theme-switch.component';

@NgModule({
    declarations: [
        SidenavItemComponent,
        SidenavComponent,
        ThemeSwitchComponent,
    ],
    exports: [SidenavItemComponent, SidenavComponent, ThemeSwitchComponent],
    imports: [
        CommonModule,
        SharedModule,
        MatSlideToggleModule,
        MatButtonToggleModule,
        RouterModule,
        MatButtonModule,
        MatTooltipModule,
        MatDividerModule,
        MatIconModule,
    ],
})
export class LayoutModule {}
