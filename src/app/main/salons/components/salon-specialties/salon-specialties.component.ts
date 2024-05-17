import { Component, Input } from '@angular/core';
import { Specialty } from '../../models/specialty.model';

@Component({
    selector: 'app-salon-specialties',
    templateUrl: './salon-specialties.component.html',
    styleUrl: './salon-specialties.component.scss',
})
export class SalonSpecialtiesComponent {
    @Input()
    specialties!: Specialty[];
}
