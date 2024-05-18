import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { Theme } from '../../../core/enums/theme';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
    selector: 'app-theme-switch',
    templateUrl: './theme-switch.component.html',
    styleUrl: './theme-switch.component.scss',
})
export class ThemeSwitchComponent implements AfterViewInit {
    selectedValue!: string;
    lightModeValue = Theme.lightMode;
    darkModeValue = Theme.darkMode;

    constructor(
        private theme: ThemeService,
        //TODO: check why do we need to use this here. Expression change after it was being checked error.
        private change: ChangeDetectorRef,
    ) {}

    ngAfterViewInit(): void {
        this.theme.initTheme();
        this.selectedValue = this.theme.colorTheme;
        this.change.detectChanges();
    }

    public onToggle(newTheme: Theme) {
        this.selectedValue = newTheme;
    }
}
