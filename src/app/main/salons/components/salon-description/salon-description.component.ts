import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-salon-description',
    templateUrl: './salon-description.component.html',
    styleUrl: './salon-description.component.scss',
})
export class SalonDescriptionComponent {
    @Input()
    description!: string;
}
