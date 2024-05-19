import { Component, Input } from '@angular/core';
import { Section } from '../../models/section.model';

@Component({
    selector: 'app-salon-sections',
    templateUrl: './salon-sections.component.html',
    styleUrl: './salon-sections.component.scss',
})
export class SalonSectionsComponent {
    @Input()
    sections!: Section[];
}
