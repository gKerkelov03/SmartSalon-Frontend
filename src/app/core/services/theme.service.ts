import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { userThemeKey } from '../constants/local-storage-keys';
import { Theme } from '../enums/theme';
import { LocalStorageService } from './local-storage.service';

@Injectable({
    providedIn: 'root',
})
export class ThemeService {
    renderer: Renderer2;
    colorTheme!: string;

    constructor(
        rendererFactory: RendererFactory2,
        private localStorageUtil: LocalStorageService
    ) {
        this.renderer = rendererFactory.createRenderer(null, null);
    }

    initTheme(): void {
        this.getColorTheme();
        this.renderer.addClass(document.body, this.colorTheme);
    }

    update(theme: Theme): void {
        this.setColorTheme(theme);
        const previousColorTheme =
            theme === Theme.darkMode ? Theme.lightMode : Theme.darkMode;
        this.renderer.removeClass(document.body, previousColorTheme);
        this.renderer.addClass(document.body, theme);
    }

    isLightMode(): boolean {
        return this.colorTheme === Theme.lightMode;
    }

    isDarkMode(): boolean {
        return this.colorTheme === Theme.darkMode;
    }

    setColorTheme(theme: Theme): void {
        this.colorTheme = theme;
        this.localStorageUtil.setItem(userThemeKey, theme);
    }

    getColorTheme(): void {
        const userTheme = localStorage.getItem(userThemeKey);
        if (userTheme === null) {
            this.colorTheme = Theme.darkMode;
        } else {
            this.colorTheme = userTheme;
        }
    }
}
