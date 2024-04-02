import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-search-salons-page',
    templateUrl: './search-salons-page.component.html',
    styleUrl: './search-salons-page.component.scss',
})
export class SearchSalonsPageComponent implements OnInit {
    ngOnInit(): void {
        console.log('search salons is called');
    }
}
