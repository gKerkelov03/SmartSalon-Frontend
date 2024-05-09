import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-salons-search-bar',
    templateUrl: './salons-search-bar.component.html',
    styleUrl: './salons-search-bar.component.scss',
})
export class SalonsSearchBarComponent {
    myControl = new FormControl('');
    options: string[] = ['One', 'Two', 'Three'];
}
