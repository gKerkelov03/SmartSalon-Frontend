import { Component } from '@angular/core';

@Component({
    selector: 'app-personal-information',
    templateUrl: './personal-information.component.html',
    styleUrls: ['./personal-information.component.scss'],
})
export class PersonalInformation {
    canEdit: boolean = false;
    isEditIconVisible: boolean = true;

    allowEditing(): void {
        this.canEdit = true;
        this.isEditIconVisible = false;
    }

    forbidEditing(): void {
        this.canEdit = false;
        this.isEditIconVisible = true;
    }
}
