import { Component, OnInit } from '@angular/core';
import { Theme } from '../../../core/enums/theme';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
    selector: 'app-theme-switch',
    templateUrl: './theme-switch.component.html',
    styleUrl: './theme-switch.component.scss',
})
export class ThemeSwitchComponent implements OnInit {
    selectedValue!: string;
    lightModeValue = Theme.lightMode;
    darkModeValue = Theme.darkMode;

    constructor(private theme: ThemeService) {}

    ngOnInit(): void {
        this.theme.initTheme();
        this.selectedValue = this.theme.colorTheme;
    }

    public onToggle(newTheme: Theme) {
        this.selectedValue = newTheme;
    }
}
