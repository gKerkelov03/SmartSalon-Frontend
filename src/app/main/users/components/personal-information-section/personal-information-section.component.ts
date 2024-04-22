import { Component } from '@angular/core';

@Component({
    selector: 'app-personal-information-section',
    templateUrl: './personal-information-section.component.html',
    styleUrls: ['./personal-information-section.component.scss']
})
export class ProfileChangeDataSectionComponent {
    canEdit: boolean = false;

    editIconClicked(): void {
        this.canEdit = true;
    }

    setCanEditToFalse(): void {
        this.canEdit = false;
    }
}
