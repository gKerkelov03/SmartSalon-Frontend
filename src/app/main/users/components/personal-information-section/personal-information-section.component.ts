import { Component } from '@angular/core';

@Component({
    selector: 'app-personal-information-section',
    templateUrl: './personal-information-section.component.html',
    styleUrls: ['./personal-information-section.component.scss'],
})
export class ProfileChangeDataSectionComponent {
    canEdit: boolean = false;
    isEditIconVisible: boolean = true;

    allowEditing(): void {
        this.canEdit = true;
        this.isEditIconVisible = false;
    }

    ForbidEditing(): void {
        this.canEdit = false;
        this.isEditIconVisible = true;
    }
}
